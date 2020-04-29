module.exports = {
    name: 'makeme',
    description: 'Update role of calling user',
    execute(message, args) {
        const rolesMentioned = message.mentions.roles.map(role => role.name);

        // If no roles mentioned
        if (!rolesMentioned.length) {
            message.reply(`please specify a role.`);
            return;
        }

        // If more than 1 role mentioned
        if (rolesMentioned.length !== 1) {
            message.reply('please specify 1 role.');
            return;
        }


        // console.log("these roles: ",message.mentions.roles);
        // console.log("these roles mapped: ",message.mentions.roles.map(role => role.name));

        // Change role
        message.guild.member(message.author).roles.set(message.mentions.roles)
            .then(console.log)
            .catch(console.error);

        // Confirmation message
        message.channel.send(`Ya got changed to a ${rolesMentioned[0]}`);
    },
};