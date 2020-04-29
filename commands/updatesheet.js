const command = require(`./checkme.js`);

module.exports = {
  name: 'updatesheet',
  description: 'Reload spreadsheet.',
  cooldown: 10,
  guildOnly: true,
  execute(message) {
    // // Get calling user's guildMember info
    // let callingUser = message.channel.guild.member(message.author);
    
    // // Make sure calling user is a manager or above
    // let role = callingUser.roles.find(role => role.name == 'rookie');
    
    // if (!role) {
    //   return;
    // }
    
    try {
      command.init();
    } catch (error) {
      return console.error(error);
    }
    
    message.channel.send('Reloaded');
  },
};