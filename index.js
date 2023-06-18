require('dotenv').config();
const { Client, IntentsBitField, Events, GatewayIntentBits, ActivityType, Collection} = require('discord.js');
const fs = require("fs");
const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ],
});
bot.commands = new Collection();
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
    bot.user.setActivity({
        name: '/help 獲取指令列表',
        type: ActivityType.Playing,
    });
});

//後臺聊天
let y = process.openStdin()
y.addListener("data",res => {
    let x = res.toString().trim().split(/ +/g);
    //設定後臺聊天時機器人的發話頻道id
    bot.channels.fetch(process.env.CHANNEL_ID).then(channel=>channel.send(x.join(" ")));
});

//新成員加入or離開伺服器的系統公告
bot.on('guildMemberAdd', async member => {
    console.log(`${member.id} join the server.`);
    //設定機器人的公告頻道為一個名叫機器人頻道的文字頻道
    let targetChannel = member.guild.channels.cache.find(channel => channel.name === process.env.CHENNEL_NAME);
    targetChannel.send(`各位注意! ${member} 誤上賊船LA !!`);
});
bot.on('guildMemberRemove', async member => {
    console.log(`${member.id} left the server.`);
    let targetChannel = member.guild.channels.cache.find(channel => channel.name === process.env.CHENNEL_NAME);
    targetChannel.send(`各位注意! ${member} 安全下庄 !!`);
});

//頻道創建or刪除的系統公告
bot.on('channelCreate', async channel => {
    console.log(`${channel.name} has been created.`);
    let targetChannel = channel.guild.channels.cache.find(channel => channel.name === process.env.CHENNEL_NAME);
    targetChannel.send(`🌋 由於大規模的海底火山噴發，一塊新大陸 ${channel} 出現了！`);
});
bot.on('channelDelete', async channel => {
    console.log(`${channel.name} has been delete.`);
    let targetChannel = channel.guild.channels.cache.find(channel => channel.name === process.env.CHENNEL_NAME);
    targetChannel.send(`🌊隨著海平面上升 ${channel} 與亞特蘭提斯一同沉入水中`);
});


//message listener
bot.on("messageCreate", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(message.content.includes("油膩")) message.channel.send("什麼? 油膩? 你說我油膩!?");
    if(message.content=="臉頰") message.channel.send("萌萌!");
    if(message.content.includes("晚餐吃啥")){
        var restroom =['鬲饕','成功牛排','7-11','學餐'];
        var point = Math.floor(Math.random()*(restroom.length));
        message.channel.send("吃"+restroom[point]);
    }
//文字聊天獲得貨幣
/* if(!coin[message.author.id]){
    coin[message.author.id] = {
        coins: 0
    };
}
let coinAmt = Math.floor(Math.random() * 15) + 1;
let baseAmt = Math.floor(Math.random() * 15) + 1;
console.log(`${coinAmt} : ${baseAmt}`);
if(coinAmt === baseAmt){
    coin[message.author.id] = {
        coins: coin[message.author.id].coins + coinAmt
    };
fs.writeFile("./coins.json",JSON.stringify(coin),(err) => {
    if (err) console.log(err)
});
let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#00FF00")
    .addField(`<:bal:570154707679445004>`,`已獲得 ${coinAmt} 毛豆`);

message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
 */

    //discord.js v12版前，解析message內容觸發機器人指令

    /* let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args); */

});

//以斜線+指令名稱觸發機器人指令
bot.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    if (!command) return;
    
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: '處理命令時發生錯誤', ephemeral: true });
    }
});


// contribution system as Rc
//定時對在語音頻道內的使用者給予積分
if(onlineMembers !== "undifine") setInterval(giveContribution , 6000); //3600000

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
bot.on('voiceStateUpdate', (oldState, newState) => {
    //console.log(`voiceStateUpdate: ${oldState} | ${newState}`);
    //console.log(oldState);

    let newUserChannel = newState.channel;
    let oldUserChannel = oldState.channel;

    // User Joins a voice channel
    if (oldUserChannel === null && newUserChannel !== null) {
        onlineMembers.push(newState.member.id);
        
        // 新成員初始化
        if (!contribution[newState.member.id]) {
            contribution[newState.member.id] = {
                contribution: 0,
                level: 1
            };
            fs.writeFile("./貢獻值.json", JSON.stringify(contribution), (err) => {
                if (err) console.log(err)
            });
        }
        console.log(`${newState.member.user.username} 加入頻道`);
    } else if (newUserChannel === null) {
        onlineMembers = onlineMembers.filter(uid => uid !== oldState.member.id);
        console.log(`${oldState.member.user.username} 離開頻道`);
    }
});


bot.login(process.env.TOKEN);
