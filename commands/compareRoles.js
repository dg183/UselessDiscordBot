module.exports = {
    name: 'compareroles',
    aliases: ['compare', 'comp'],
    description: `Change a specified user's role`,
    args: true,
    usage: '<role1> <role2>',
    guildOnly: true,
    execute(message, args) {


        /** This function doesn't really work atm.
         * Issue: Although it can compare two roles correctly, 
         *      the order of the roles is invalid
         * 'message.mentions.roles' is an unordered set. 
         *      This means that we cannot compare two of the same roles ('!comp @rookie @rookie),
         *              as @rookie will only show up once in the set
         *      This also means that we cannot compare by order, since the set isn't
         *              ordered in the same order they were mentioned
         */

        const rolesMentioned = message.mentions.roles.map(role => role.name);
        // const rolesList = message.mentions.roles.map(role => role);
        const rolesList = message.mentions.roles.array();
        console.log("rolesList = ", rolesList);

        // If no roles mentioned
        if (!rolesMentioned.length) {
            message.reply(`please specify a role.`);
            return;
        }

        // If more than 1 role mentioned
        if (rolesMentioned.length !== 2) {
            message.reply('please specify 2 roles.');
            return;
        }

        let result = 0;
        // rolesMentioned[0]compareP
        // const roles = message.guild.roles;
        console.log("roleslist 0 : ", rolesList[0]);
        result = rolesList[0].comparePositionTo(rolesList[1]);
        message.channel.send(`Result is ${result}\nNegative if first < second\nPositive if first > second\n0 if same`);
        
    },
};
