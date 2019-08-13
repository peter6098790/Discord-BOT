const Discord = require("discord.js");
const fs = require("fs");
let contribution = require("../貢獻值.json");
let badges = require("../badges.json");
const range = ['菜鳥','偵查兵','步兵','士官','資深士官','一等士官','石衛士','血衛士','軍團士兵','百夫長','勇士','中將','將軍','督軍','高階督軍','大酋長'];


module.exports.run = async (bot, message, args) => {
    if(args[0]== "help"){
        message.channel.send("!profile 顯示個人檔案,若無反應請先加入任一語音頻道初始化");
        return;
    }
    let usercon = message.author.displayAvatarURL;
    let uContribution = contribution[message.author.id].contribution;
    let level = contribution[message.author.id].level;
    
    let needXp = (level+1)*100 - uContribution;
    let init_rate = "□□□□□□□□□□";
    let filled_rate = "■■■■■■■■■■";
    let progress_rate = "";
    //經驗等級>15時,稱號保持Lv15
    if(level >= 15){
        range[level] = range[15];
    }
    //升級所需經驗進度條
    if(~~((needXp%100)/10)==0){
        progress_rate = "[" + init_rate + "]";
    }else{
        progress_rate = "[" + filled_rate.substring(0,10-(~~((needXp%100)/10))) + init_rate.substring(0,~~((needXp%100)/10)) + "]"
    }    
    if(badges[message.author.id]){
        let profileEmbed = new Discord.RichEmbed()
        .setDescription("個人資料")
        .setColor("#00FF00")
        .setThumbnail(usercon)
        .addField("玩家:",message.author.username)
        .addField("貢獻值:",uContribution)
        //.addField(`財富<:bal:570154707679445004>:`,coins[message.author.id].coins + `毛豆`)
        .addField("榮譽軍階:" , range[level] + `(Lv.${level})` )
        .addField("進度:", progress_rate)
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
        .addField("進度:", progress_rate)
        .addField("徽章牆:" ,"無");
        await message.channel.send(profileEmbed);
    }
    
}

module.exports.help = {
    name: "profile"
}
