const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../bal.json");

module.exports.run = async (bot, message, args) => {
    if(args[0] == "help"){
        message.channel.send("貨幣系統,顯示你目前的財產");
        return;
    }
    if(!coins[message.author.id]){
        coins[message.author.id] = {
            coin: 0
        };
    }
    fs.writeFile("./bal.json",JSON.stringify(coins),(err) => {
        if (err) console.log(err)
    });
    let CoinsEmbed = new Discord.RichEmbed()
    .addField("擁有毛豆:",coins[message.author.id].coin);
    message.channel.send(CoinsEmbed).then(msg => msg.delete(5000));

}

module.exports.help = {
    name:"coins"
}