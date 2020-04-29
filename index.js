// Require the discord.js module
const Discord = require('discord.js');
const fs = require('fs');
const { prefix,token } = require('./config.json');

// Create new client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Import commands from 'commands' folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Set up cooldowns
const cooldowns = new Discord.Collection();


// when client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Ready!');
});

// log into discord with app's token
client.login(token);


client.on('message', message => {
    console.log(message.content);

    // ILY <3
    if (message.content.toLowerCase() ===`i love you`) {
        message.channel.send('I love you too <3');
    } 

    // Parse message
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    console.log("args: ", args);

    const commandName = args.shift().toLowerCase();
    // if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName) 
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    // Check if command is 'guildOnly'
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply(`I can't execute that command inside DMs!`);
    }

    // Check if command requires arguments
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nUsage: \`${prefix}${commandName} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    // Check for cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000; // default = 3

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Execute command
    try {
        command.execute(message,args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
  
})


