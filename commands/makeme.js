module.exports = {
    name: 'makeme',
    description: 'Update role of calling user',
    execute(message, args) {
        const rolesMentioned = message.mentions.roles.map(role => role.name);
        const rolesList = message.mentions.roles.array();

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

        // TODO: check that the role mentioned is lower than or equal to current role
        const wantedRole = rolesList[0];
        const currentRole = message.guild.member(message.author).roles.highest;

        /**Result ==:
         * Negative if current < wanted
         * Positive if current > wanted
         * 0 if same
         */
        result = currentRole.comparePositionTo(wantedRole);

        // If not high enough permissions, exit
        if (result <= 0) {
            message.channel.send(`Sorry buddy boy you aint high enough rank to do this`);
            return;
        }

        // Change role
        message.guild.member(message.author).roles.set(message.mentions.roles)
            .then(console.log)
            .catch(console.error);

        // Confirmation message
        message.channel.send(`Ya got changed to a ${rolesMentioned[0]}`);
    },
};