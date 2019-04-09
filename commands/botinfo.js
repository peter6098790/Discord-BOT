const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let botcon = bot.user.displayAvatarURL;
    let botEmbed = new Discord.RichEmbed()
    .setDescription("機器人資訊")
    .setColor("#9999FF")
    .setThumbnail(botcon)
    .addField("機器人ID:", bot.user.username)
    .addField("創建日期:",bot.user.createdAt);
    message.channel.send(botEmbed);
}

module.exports.help = {
    name: "botinfo"
}