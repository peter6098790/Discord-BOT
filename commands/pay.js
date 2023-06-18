const Discord = require("discord.js")
const fs = require("fs")
let coins = require("../bal.json")

module.exports.run = async (bot, message, args) => {
    if(args[0]== "help"){
        message.channel.send("付錢給其他人:\n !pay <@使用者> <欲付金額>");
        return;
    }
    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let pCoins = parseInt(args[1]);
    if(!coins[pUser.id]){
        coins[pUser.id] = {
            coin: 0
        }
    }
    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coin: 0
        }
    }

    if(coins[message.author.id].coin < pCoins){
        message.reply("餘額不足");
        return;
    }
    if(pUser.id == message.author.id)
        message.reply("無效輸入")

    sCoin = coins[message.author.id].coin
    pCoin = coins[pUser.id].coin

    coins[message.author.id] = {
        coin: sCoin - pCoins
    }
    coins[pUser.id] = {
        coin: pCoin + pCoins
    }
    fs.writeFile("../bal.json",JSON.stringify(coins),(err) => {
        message.channel.send(`${message.author} 給予 ${pUser} ${pCoins}顆毛豆!`)
        if (err) console.log(err)
    });
}

module.exports.help = {
    name: "pay"
}