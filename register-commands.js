
const { REST, Routes } = require('discord.js');
const registerCommands = require('./register-commands-config.json')

const commands = [
  {
    name: 'help',
    description: '指令列表',
  },
];

const rest = new REST().setToken(registerCommands.token);

(async () => {
  try {
    console.log('指令註冊中...');
    
    await rest.put(
      Routes.applicationGuildCommands(
        registerCommands.clientId,
        registerCommands.guildId
      ),
      { body: commands }
    );

    console.log('指令註冊成功!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();