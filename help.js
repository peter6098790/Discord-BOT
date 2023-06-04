const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('指令列表'),

    async execute(interaction) {
        let helpEmbed = new EmbedBuilder()
        .setDescription("指令列表")
        .addFields({ name: "機器人相關", value: "!botinfo , !report(未開放)"})
        .addFields({ name: "管理訊息", value: "!cls"})
        .addFields({ name: "個人訊息", value: "!profile , !badge(未開放)"})
        .addFields({ name: "貨幣經濟", value: "!coins , !pay"})
        .addFields({ name: "備註", value: "!指令 help看更詳細用法"})
        .setColor("#8300ff");

        return interaction.reply('成功');
    },
}

module.exports.help = {
    name: "help"
}