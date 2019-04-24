const botconfig = require("./botconfig.json");
const Discord = require ("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let contribution = require("./貢獻值.json");
//let coin = require("./coins.json");

//command loading
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


//bot status
bot.on("ready", async() => {
    console.log(`${bot.user.username} 已經上線`);
    bot.user.setActivity("!help 獲得指令列表", {type: "PLAYING"});
});


//console chatter
let y = process.openStdin()
y.addListener("data",res => {
    let x = res.toString().trim().split(/ +/g)
    bot.channels.get("564780071454375937").send(x.join(" "));
});

//新成員加入or離開伺服器的系統公告
bot.on('guildMemberAdd', async member => {
    console.log(`${member.id} join the server.`);
    let welcomechannel = member.guild.channels.find(`name`,"魔獸打起來");
    welcomechannel.send(`各位注意! ${member} 誤上賊船LA !!`);

});
bot.on('guildMemberRemove', async member => {
    console.log(`${member.id} left the server.`);
    let welcomechannel = member.guild.channels.find(`name`,"魔獸打起來");
    welcomechannel.send(`各位注意! ${member} 安全下庄 !!`);

});
//新頻道被創建或刪除的系統公告
bot.on('channelCreate', async channel => {
    console.log(`${channel.name} has been created.`);
    let targetChannel = channel.guild.channels.find(`name`,"魔獸打起來");
    targetChannel.send(`🌋由於大規模的海底火山噴發 一塊新大陸 ${channel} 出現了!`);

});
bot.on('channelDelete', async channel => {
    console.log(`${channel.name} has been created.`);
    let targetChannel = channel.guild.channels.find(`name`,"魔獸打起來");
    targetChannel.send(`🌊隨著海平面上升 ${channel} 隨著亞特蘭提斯一同沉入水中`);

});


//message listener
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    if(message.content.includes("小雞雞")){
        message.react("💢");
    }
    if(message.content.includes("油膩")) message.channel.send("什麼? 油膩? 你說我油膩!?");
    if(message.content.includes("==")) message.channel.send("= =");
    if(message.content.includes("6")) message.react("🤙");
    if(message.content == "行") message.channel.send("我們行不行? 絕對沒問題!");
    if(message.content == "型") message.channel.send("我們行不行? 絕對沒問題!");
    if(message.content=="臉頰") message.channel.send("萌萌!");
    if(message.content.includes("閉嘴")) message.channel.send("你才閉嘴🖕");
    if(message.content === "?") message.channel.send("?");
    if(message.content.includes("我是誰")) message.channel.send("你是"+message.author.username);
    if(message.content.includes("@Frostwolf"))message.channel.send("萩芳站起來!");
    if(message.content.includes("@希爾頓")) message.channel.send(message.author.username+"想對你說:請你出去");
    if(message.content.includes("晚餐吃啥")){
        var restroom =['鬲饕','成功牛排','7-11','學餐'];
        var point = Math.floor(Math.random()*(restroom.length));
        message.channel.send("吃"+restroom[point]);
    }
    if(message.content.includes("點歌")){
        message.channel.send(
            ":headphones: 點歌:headphones: "+"\n"+
            "!join:將音樂BOT加入目前所在的語音頻道"+"\n"+
            "!p 歌曲名:BOT會以此為關鍵字從youtube搜尋歌曲(有時候會抓到奇怪的影片= =)"+"\n"+
            "!p youtube影片網址:同上,將歌曲加入BOT播放列表"+"\n"+
            "!playtop:使用方式同!p 只是加入的歌曲於當前歌曲播放完畢後就會開始播放"+"\n"+
            "!np:查詢現在播放的歌曲名稱"+"\n"+
            "!skip:跳過當前播放的歌曲"+"\n"+
            "!stop:暫停播放"+"\n"+
            "!resume:繼續播放"+"\n"+
            "!clear:清空BOT播放清單"+"\n"+
            "!disconnect or !leave:讓BOT離開語音頻道"+"\n"
        );
    }
    //文字聊天獲得貨幣
    // if(!coin[message.author.id]){
    //     coin[message.author.id] = {
    //         coins: 0
    //     };
    // }

    // let coinAmt = Math.floor(Math.random() * 15) + 1;
    // let baseAmt = Math.floor(Math.random() * 15) + 1;
    // console.log(`${coinAmt} : ${baseAmt}`);
    // if(coinAmt === baseAmt){
    //     coin[message.author.id] = {
    //         coins: coin[message.author.id].coins + coinAmt
    //     };
    //     fs.writeFile("./coins.json",JSON.stringify(coin),(err) => {
    //         if (err) console.log(err)
    //     });
    //     let coinEmbed = new Discord.RichEmbed()
    //     .setAuthor(message.author.username)
    //     .setColor("#00FF00")
    //     .addField(`<:bal:570154707679445004>`,`已獲得 ${coinAmt} 毛豆`);

    //     message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
    // }

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

});

// contribution system as Rc
if(onlineMembers !== "undifine") setInterval(giveContribution , 3600000);
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
//check which user join the voice channel
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
            fs.writeFile("./貢獻值.json",JSON.stringify(contribution),(err) => {
                if (err) console.log(err)
            });
        }
        console.log(`${newMember.user.username} 加入頻道`);
    } else if(newUserChannel === undefined){
        function checkLeave(uid){
            return uid !== oldMember.id;
        }
        onlineMembers = onlineMembers.filter(checkLeave);
        console.log(`${oldMember.user.username} 離開頻道`);
    }
});


bot.login(botconfig.token);