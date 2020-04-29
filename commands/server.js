module.exports = {
    name: 'server',
    description: 'Print server name and member count',
    execute(message, args) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nmessage.guild = ${message.guild}`);
    },
};