const botconfig = require("./botconfig.json");
const Discord = require ("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let contribution = require("./貢獻值.json");

fs.readdir("./commands/", (err, files) => {
    
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0 ){
        console.log("找不到指令!");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

})



bot.on("ready", async() => {
    console.log(`${bot.user.username} 已經上線`);
    bot.user.setActivity("開發中", {type: "PLAYING"});
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    //文字聊天獲得貨幣
    // if(!coins[message.author.id]){
    //     coins[message.author.id] = {
    //         coins: 0
    //     };
    // }

    // let coinAmt = Math.floor(Math.random() * 15) + 1;
    // let baseAmt = Math.floor(Math.random() * 15) + 1;
    //console.log(`${coinAmt} : ${baseAmt}`);
    // if(coinAmt === baseAmt){
    //     coins[message.author.id] = {
    //         coins: coins[message.author.id].coins +coinAmt
    //     };
    // fs.writeFile("./coins.json",JSON.stringify(coins),(err) => {
    //     if (err) console.log(err)
    // });
    // let coinEmbed = new Discord.RichEmbed()
    // .setAuthor(message.author.username)
    // .setColor("#00FF00")
    // .addField("🏆",`已獲得 ${coinAmt} 貢獻值`);

    // message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
    // }

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

});

// contribution system as Rc
if(onlineMembers !== "undifine") setInterval(giveContribution , 3000);
// give user contribution
function giveContribution(){
    onlineMembers.forEach(function(uid) {
        contribution[uid].contribution = contribution[uid].contribution + 1;
        let curLevel  = contribution[uid].level;
        let nextLevel = contribution[uid].level * 100;
        if(nextLevel <= contribution[uid].contribution){
            contribution[uid].level = curLevel + 1;
        }
        fs.writeFile("./貢獻值.json",JSON.stringify(contribution),(err) => {
            if (err) console.log(err)
        });
        console.log(`${uid}'s contribution now is ${contribution[uid].contribution}! & level now is ${contribution[uid].level}`);
    });
}

var onlineMembers = [];
bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    //User Joins a voice channel
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        onlineMembers[onlineMembers.length]=`${newMember.id}`;
        if(!contribution[newMember.id]){
            contribution[newMember.id] = {
                contribution: 0,
                level: 1
            };
        }
    } else if(newUserChannel === undefined){
        function checkLeave(uid){
            return uid !== oldMember.id;
        }
        onlineMembers = onlineMembers.filter(checkLeave);
        console.log(`${oldMember.user.username} 離開頻道`);
    }
});


bot.login(botconfig.token);