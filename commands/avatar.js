module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp', 'dp'],
    description: `Display user's avatar`,
    execute(message, args) {
        message.channel.send(`Your avatar: <${message.author.displayAvatarURL({
            format: "png",
            dynamic: true
        })}`);
    },
};