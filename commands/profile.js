const Discord = require("discord.js");
let contribution = require("../貢獻值.json");

module.exports.run = async (bot, message, args) => {
    let usercon = message.author.displayAvatarURL;
    let uContribution = contribution[message.author.id].contribution;
    let level = contribution[message.author.id].level;
    var range;
    if(level === 1) range = "偵查兵"; else if(level === 2) range = "步兵"; 
    else if(level === 3) range = "士官"; else if(level === 4) range = "資深士官";
    else if(level === 5) range = "一等士官"; else if(level === 6) range = "石衛士";
    else if(level === 7) range = "血衛士"; else if(level === 8) range = "軍團士兵";
    else if(level === 9) range = "百夫長"; else if(level === 10) range = "勇士";
    else if(level === 11) range = "中將"; else if(level === 12) range = "將軍";
    else if(level === 13) range = "督軍"; else if(level === 14) range = "高階督軍"; else if(level === 15) range = "大酋長";

    let contributionEmbed = new Discord.RichEmbed()
    .setDescription("個人資料")
    //.setAuthor(message.author.username)
    .setColor("#00FF00")
    .setThumbnail(usercon)
    .addField("玩家:",message.author.username)
    .addField("貢獻值:",uContribution)
    .addField("軍階:", range);
    message.channel.send(contributionEmbed);//.then(msg => {msg.delete(5000)});
}

module.exports.help = {
    name: "profile"
}