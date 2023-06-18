const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require("fs");
let contribution = require("../貢獻值.json");
let badges = require("../badges.json");
const range = ['菜鳥','偵查兵','步兵','士官','資深士官','一等士官','石衛士','血衛士','軍團士兵','百夫長','勇士','中將','將軍','督軍','高階督軍','大酋長'];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('個人檔案'),

    async execute(interaction) {
        //console.log(interaction);
        let usercon = interaction.user.avatar;
        let userId = interaction.user.id;
        let userName = interaction.user.username
        if(userId in contribution){
            let uContribution = contribution[userId].contribution;
            let level = contribution[userId].level;
    
            let needXp = (level+1)*100 - uContribution;
            let init_rate = "□□□□□□□□□□";
            let filled_rate = "■■■■■■■■■■";
            let progress_rate = "";
            //經驗等級>15時,稱號保持Lv15
            if(level >= 15){
                range[level] = range[15];
            }
    
            if(~~((needXp%100)/10)==0){
                progress_rate = "[" + init_rate + "]";
            }else{
                progress_rate = "[" + filled_rate.substring(0,10-(~~((needXp%100)/10))) + init_rate.substring(0,~~((needXp%100)/10)) + "]"
            }
    
            let profileEmbed = new EmbedBuilder()
                .setDescription("個人資料")
                .setColor("#00FF00")
                .setThumbnail(usercon)
                .addFields({ name: "玩家:", value: userName})
                .addFields({ name: "貢獻值:", value: uContribution.toString()})
                .addFields({ name: "榮譽軍階:", value: range[level] + `(Lv.${level})`})
                .addFields({ name: "升級進度:", value: progress_rate})
                return interaction.reply({embeds: [profileEmbed]});
        }else{
            return interaction.reply("尚無資料，請先加入任一語音頻道!");
        }
        
        // 有無徽章
        /* if(badges[interaction.user.id]){
            profileEmbed.addFields({ name: "徽章牆:", value: badges[userId].badgeList.join(" ")});
            return interaction.reply({embeds: [profileEmbed]});
        }else {
            profileEmbed.addFields({ name: "徽章牆:", value: "無"});
            return interaction.reply({embeds: [profileEmbed]});
        } */
    },
}
module.exports.help = {
    name: "profile"
}
