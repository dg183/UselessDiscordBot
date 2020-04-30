module.exports = {
    name: 'role',
    description: `Change a specified user's role`,
    args: true,
    usage: '<user> <role>',
    guildOnly: true,
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

        const membersMentioned = message.mentions.members.map(member => member.name);
        if (!membersMentioned.length) {
            message.reply(`please specify a user`);
        }

        // For each member, 
        message.mentions.members.map(member => {
            // Change role
            message.guild.member(member).roles.set(message.mentions.roles)
            .then(console.log)
            .catch(console.error);
            message.channel.send(`${member.tag} got changed to a ${rolesMentioned[0]}`); // Confirmation message
        })

        
    },
};
