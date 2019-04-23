const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let helpEmbed = new Discord.RichEmbed()
    .setDescription("指令列表")
    .addField("機器人相關","!botinfo , !report(未開放)")
    .addField("管理訊息","!cls")
    .addField("個人訊息","!profile , !badge(未開放)")
    .addField("備註","!指令 help看更詳細用法")
    .setColor("#8300ff");

    message.channel.send(helpEmbed);
}

module.exports.help = {
    name: "help"
}