const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(args[0]== "help"){
        message.channel.send("訊息批量刪除:\n!cls <要刪除的訊息量>");
        return;
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("權限不足");
    if(!args[0]) return message.channel.send("umm");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`已清除 ${args[0]} 條訊息`).then(msg => msg.delete(5000));
    });
}

module.exports.help = {
    name: "cls"
}