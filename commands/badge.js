const Discord = require("discord.js");
const fs = require("fs");
let badges = require("../badges.json");

module.exports.run = async (bot, message, args) => {
    message.channel.send("功能未開放~");
    return;
    // var badgeList = [];
    // let uid = message.author.id;
    // if(!badges[uid]){
    //     badges[uid] = {
    //         badgeList
    //     };
    //     message.channel.send("您還未收集任何徽章");
    //     fs.writeFile("../badges.json",JSON.stringify(badges),(err) => {
    //         if (err) console.log(err)
    //     });
    // }
    // message.channel.send(badges[uid].badgeList);
    // // badges[message.author.id].badgeList.push("1");
    // // fs.writeFile("./badges.json",JSON.stringify(badges),(err) => {
    // //     if (err) console.log(err)
    // // });
    
    // var badgeWall = ['<:PvPRank10:565724806226640907>','<:PvPRank11:565724806134235137>',
    //                 '<:PvPRank12:565724806524174366>','<:PvPRank13:565724806423642112>',
    //                 '<:PvPRank14:565723271656505344>','<a:wowBongo1:567038239676956765>',
    //                 '<:User_Insurance:566224137668788224>','<:tissue:566172570588545034>',
    //                 '<:test2:566174326848487439>','<:test1:566174326831841300>',
    //                 '<:Plugin:566239677988732948>','<:moon_flag:566239676956934147>',
    //                 '<:Horde02:566239677187883018>','<:Horde01:566239677267443722>',
    //                 '<:GrimReaper:566239678399905842>','<:aeaaqqdqas:566239677280157696>',
    //                 '<:advance:566239677191946284>'];
    //var badgeString = badgeWall.join(" ")
    // //let badgeEmbed = new Discord.RichEmbed()
    // .setDescription("徽章列表")
    // .setColor("#00FF00")
    //.addField(badgeWall.join(" "))
    //.addField("徽章牆:" ,bedge.join(" "));
    //await message.channel.send(badgeWall.join(" "));//.then(msg => {msg.delete(5000)});
}

module.exports.help = {
    name: "badge"
}