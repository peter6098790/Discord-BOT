require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'help',
    description: '指令列表',
  },
  {
    name: 'profile',
    description: '個人資料',
  },
];

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('指令註冊中...');
    
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('指令註冊成功!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
