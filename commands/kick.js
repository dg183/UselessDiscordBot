module.exports = {
    name: 'kick',
    description: 'Kick a user',
    guildOnly: true,
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to kick them mate');
        }
        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username} lol`);

    },
};