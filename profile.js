const Discord = require("discord.js");
let contribution = require("../貢獻值.json");

module.exports.run = async (bot, message, args) => {
    let usercon = message.author.displayAvatarURL;
    let uContribution = contribution[message.author.id].contribution;
    let level = contribution[message.author.id].level;
    var range = ['菜鳥','偵查兵','步兵','士官','資深士官','一等士官','石衛士','血衛士','軍團士兵','百夫長','勇士<:PvPRank10:565724806226640907>','中將<:PvPRank11:565724806134235137>','將軍<:PvPRank12:565724806524174366>','督軍<:PvPRank13:565724806423642112>','高階督軍<:PvPRank14:565723271656505344>','大酋長'];
    
    let profileEmbed = new Discord.RichEmbed()
    .setDescription("個人資料")
    //.setAuthor(message.author.username)
    .setColor("#00FF00")
    .setThumbnail(usercon)
    .addField("玩家:",message.author.username)
    .addField("貢獻值:",uContribution)
    .addField("榮譽軍階:" ,range[level]);
    message.channel.send(profileEmbed);//.then(msg => {msg.delete(5000)});
}

module.exports.help = {
    name: "profile"
}