module.exports = {
    name: 'complimentme',
    description: 'Boost your ego',
    guildOnly: true,
    execute(message, args) {
        if (args.length && message.mentions.users) {
            if((message.author.username) == "niico") {
                message.channel.send(`${message.mentions.users.first()} thinks that you are a fool!`);
            } else {message.channel.send(`${message.mentions.users.first()} thinks that you are amazing!`);}
            
        }
        else {
            if((message.author.username) == "niico") {
                message.channel.send(`David you are a fool.`);
            }
            else if((message.author.username) == "shef") {
                message.channel.send(`Oh @${message.author.username}! I'm in the presence of a God`);
            }
            else {
                message.channel.send(`You're not as cool as Steph but that's ok.`);
            }
        }
        

    },
};