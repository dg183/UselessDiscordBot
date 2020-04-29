module.exports = {
    name: 'role',
    description: `Change a user's role`,
    args: true,
    usage: '<user> <role>',
    execute(message, args) {
        // if (!args.length) {
        //     message.channel.send(`You didn't prove any arguments, ${message.author}!`);
        //     return;
        // }

        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        message.channel.send(`Command name: ${command}\nARguments: ${args}`);
    },
};