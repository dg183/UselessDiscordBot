module.exports = {
    name: 'complimentme',
    description: 'Boost your ego',
    guildOnly: true,
    execute(message, args) {
        var compliments = [
            "Today is a good day! You should go outside",
            "Chin up King",
            "It is what it is\nhttps://www.youtube.com/watch?v=a94wYTOthKI",
            "At least you're not a starving child in Africa!",
            "Wow did you shower today?",
            "Amazing work!",
            "At least you're not as bad as David!",
            "I would fight Tom Nook for you",
            "...\n\n...I tried to think of one...but I timed out",
            "Maybe you'll find a compliment at the bottom of the bottle"
        ];
        var ret = "";
        if (args.length && message.mentions.users) {
            if((message.author.username) == "niico") {
                message.channel.send(`${message.mentions.users.first().tag} thinks that you are a fool!`);
            } else {message.channel.send(`${message.mentions.users.first().tag} thinks that you are amazing!`);}
            
        }
        else {
            if((message.author.username) == "niico") {
                ret += `David you are a fool.\nBut don't forget...`;
            }
            else if((message.author.username) == "shef") {
                ret += `I'm in the presence of a God\nBut also...`;
            }
            ret += compliments[Math.floor(Math.random()*compliments.length)];
            message.reply(ret);
        }
        

    },
};