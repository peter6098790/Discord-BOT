const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    let reason = args.join(" ").slice(1);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("回報單")
    .setColor("#9999FF")        //.addField("被檢舉人:", `${rUser} `)
    .addField("回報者:", `${message.author}`)
    .addField("頻道:", message.channel)
    .addField("BUG內容:", reason)
    .addField("時間:", message.createdAt);
        
    //set report channel
    let reportchannel = message.guild.channels.find(`name`, "東廠錦衣衛");
    if(!reportchannel) return message.channel.send("可...可惡!找不到回報中心");

    message.delete().catch(O_o=>{});
    reportchannel.send(reportEmbed);
}

module.exports.help = {
    name: "report"
}