const { prefix } = require('../config.js');

module.exports = {
    name: 'yoyo',
    description: 'Let me introduce myself',
    guildOnly: true,
    execute(message, args) {
        message.channel.send(`Hey ${message.author}, welcome to ${message.guild.name}.\n\
I am yoyorichayyy and I love to give compliments! If you want to find out how to use me just type \`${prefix}help [command name]\` and if you're feeling down ask me for a compliment with \`${prefix}complimentme\``);

    },
};