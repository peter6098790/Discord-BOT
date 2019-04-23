const Discord = require("discord.js");
const fs = require("fs");
let contribution = require("../貢獻值.json");
let badges = require("../badges.json");


module.exports.run = async (bot, message, args) => {
    if(args[0]== "help"){
        message.channel.send("!profile 顯示個人檔案,若無反應請先加入任一語音頻道初始化");
        return;
    }
    let usercon = message.author.displayAvatarURL;
    let uContribution = contribution[message.author.id].contribution;
    let level = contribution[message.author.id].level;
    var range = ['菜鳥','偵查兵','步兵','士官','資深士官','一等士官','石衛士','血衛士','軍團士兵','百夫長','勇士<:PvPRank10:565724806226640907>','中將<:PvPRank11:565724806134235137>','將軍<:PvPRank12:565724806524174366>','督軍<:PvPRank13:565724806423642112>','高階督軍<:PvPRank14:565723271656505344>','大酋長'];
    
    if(badges[message.author.id]){
        let profileEmbed = new Discord.RichEmbed()
        .setDescription("個人資料")
        .setColor("#00FF00")
        .setThumbnail(usercon)
        .addField("玩家:",message.author.username)
        .addField("貢獻值:",uContribution)
        //.addField(`財富<:bal:570154707679445004>:`,coins[message.author.id].coins + `毛豆`)
        .addField("榮譽軍階:" , range[level] + `(Lv.${level})` )
        .addField("徽章牆:" ,badges[message.author.id].badgeList.join(" "));
        await message.channel.send(profileEmbed);
    }else {
        let profileEmbed = new Discord.RichEmbed()
        .setDescription("個人資料")
        .setColor("#00FF00")
        .setThumbnail(usercon)
        .addField("玩家:",message.author.username)
        .addField("貢獻值:",uContribution)
        //.addField(`財富<:bal:570154707679445004>:`,coins[message.author.id].coins + `毛豆`)
        .addField("榮譽軍階:" , range[level] + `(Lv.${level})` )
        .addField("徽章牆:" ,"無");
        await message.channel.send(profileEmbed);
    }
    
    //.then(msg => {msg.delete(5000)});
}
//"275945235694092288":{"badgeList":["<a:wowBongo1:567038239676956765>","<a:coding:567038236229369877>","<:Horde01:566239677267443722>"]}
module.exports.help = {
    name: "profile"
}