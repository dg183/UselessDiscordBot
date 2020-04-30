// if no args, show start menu
        /** ================ Tic-Tac-Toe ===================
         * 
         *  !ttt 
         *      - Display start menu
         * 
         *  !ttt help <command> 
         *      - Give help on tictactoe command
         * 
         *  !ttt start @player2
         *      - Start a new game with player 2
         * 
         *  !ttt play <spot>
         *      - Place piece (X/O) in specified spot (1-9)
         * 
         *  !ttt status
         *      - Show current game status
         * 
         *  !ttt leave
         *      - Exit current game
         * 
         *  ================================================
         */

const TicTacToeGame = require('../classes/TicTacToeGameClass');

module.exports = {
    name: 'tictactoe',
    aliases: ['ttt'],
    description: `Play tic tac toe`,
    usage: 'just play lmao TODO: add usage',
    guildOnly: true,
    execute(message, args) {

        const client = message.client;
        console.log("client:",client);

        /* ===== !ttt =====*/
        if (!args.length) {
            // Display start menu
            message.channel.send(`!ttt display start menu`);
            return;
        }

        /* ===== !ttt help =====*/
        if (args[0].toLowerCase() === 'help') {
            message.channel.send(`!ttt help`);
            return;
        }

        /* ===== !ttt start =====*/
        if (args[0].toLowerCase() === 'start') {
            message.channel.send(`!ttt start`);
            console.log("client.ttt =",client.tictactoe);
            
            message.channel.send(`${client.tictactoe.length} games currently running,`);

            let game = new TicTacToeGame(message.author,message.author);
            client.tictactoe[client.tictactoe.length] = game;

            message.channel.send(`adding one more to make ${client.tictactoe.length}\n`);
            message.channel.send(`client.ttt = ${client.tictactoe[client.tictactoe.length - 1]}`);
            console.log("client.ttt =",client.tictactoe[client.tictactoe.length - 1]);
            return;
        }

        /* ===== !ttt play =====*/
        if (args[0].toLowerCase() === 'play') {
            message.channel.send(`!ttt play`);
            return;
        }

        /* ===== !ttt status =====*/
        if (args[0].toLowerCase() === 'status') {
            message.channel.send(`!ttt status`);

            if (client.tictactoe.length === 0) { // if no games running
                message.reply(`Try '!tictactoe start' to start a game!`);
                return;
            }

            message.channel.send(`Last game: ${client.tictactoe[client.tictactoe.length - 1]}`)
            return;
        }

        /* ===== !ttt leave =====*/
        if (args[0].toLowerCase() === 'leave') {
            message.channel.send(`!ttt leave`);
            return;
        }

        // If you've reached here, the inputed arguments are invalid
        
    },
};
