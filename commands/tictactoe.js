// if no args, show start menu
        /** ================ Tic-Tac-Toe ===================
         * 
         *  !ttt 
         *      - Display start menu
         * 
         *  !ttt help <command> 
         *      - Give help on tictactoe command
         * 
         *  !ttt challenge @player2
         *      - Start a new game with player 2
         * 
         *  !ttt place <spot>
         *      - Place piece (X/O) in specified spot (1-9)
         * 
         *  !ttt simulate
         *      - Simulate a game with random moves
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
let game;

module.exports = {
    name: 'tictactoe',
    aliases: ['ttt'],
    description: `Play tic tac toe`,
    usage: 'just play lmao TODO: add usage',
    guildOnly: true,
    execute(message, args) {

        const client = message.client;
        console.log("client:",client);

        /* ===== !ttt ===== */
        if (!args.length) {
            // Display start menu
            message.channel.send(`!ttt display start menu`);
            return;
        }

        /* ===== !ttt help <command> ===== */
        if (args[0].toLowerCase() === 'help') {
            message.channel.send(`!ttt help`);
            return;
        }

        /* ===== !ttt challenge @player2 ===== */
        if (args[0].toLowerCase() === 'challenge') {

            // TODO: Implement challenging second player
            if (args.length != 2) {
                message.channel.send(`Usage: !ttt challenge <@Player>. Get it right buddy`);
                return;
            }
            let player2;
            message.mentions.members.map(member => {
                player2 = member;
            })
                
            message.channel.send(`player2 = ${player2}`);


            message.channel.send(`!ttt start`);
            console.log("client.ttt =",client.tictactoe);
            
            message.channel.send(`${client.tictactoe.length} games currently running,`);

            game = new TicTacToeGame(message.author,player2);
            client.tictactoe[client.tictactoe.length] = game;

            message.channel.send(`adding one more to make ${client.tictactoe.length}\n`);
            message.channel.send(`client.ttt = ${client.tictactoe[client.tictactoe.length - 1]}`);
            console.log("client.ttt =",client.tictactoe[client.tictactoe.length - 1]);
            return;
        }

        /* ===== !ttt place <spot> ===== */
        if (args[0].toLowerCase() === 'place') {
            message.channel.send(`!ttt place`);

            if (args.length != 2) {
                message.channel.send(`Usage: !ttt place <position>. Get it right buddy`);
                return;
            }
            // let position = Number.isInteger(args[1]);
            let position = parseInt(args[1]);
            message.channel.send(`position = ${position}`);
            // message.channel.send(`args[1] = ${args[1]}`);
            if (!position) {
                message.channel.send(`Usage: !ttt place <position>. Position is a NUMBER`);
                return;
            }

            
            game = client.tictactoe[client.tictactoe.length - 1];

            let ret = game.makeMove(position);

            // Check if makeMove gave error
            switch (ret) {
                case 0:
                    message.channel.send(`Nice move champ.`);
                    break;
                case 1:
                    message.channel.send(`Congrats ${game.player1}, you smashed that fool!`);
                    break;
                case 2:
                    message.channel.send(`Good shit ${game.player2}, block out the haters.`);
                    break;
                case 3:
                    message.channel.send(`Tie game. You both suck.`);
                    break;
                case 4:
                    message.channel.send(`Position out of bounds. Enter position 1-9 (inclusive).`);
                    break;
                case 5:
                    message.channel.send(`Position already occupied pls read properly.`);
                    break;
            }
            
            message.channel.send(`${game}`);
            

            return;
        }

        /* ===== !ttt simulate ===== */
        if (args[0].toLowerCase() === 'simulate') {
            message.channel.send(`!ttt simulate`);
            game = client.tictactoe[client.tictactoe.length - 1];
            if (!game) {
                message.channel.send(`!ttt no game started yet`);
                return;
            }

            // TODO: make random
            game.makeMove(5);
            message.channel.send(`${game}`);
            game.makeMove(1);
            message.channel.send(`${game}`);
            game.makeMove(6);
            message.channel.send(`${game}`);
            game.makeMove(2);
            message.channel.send(`${game}`);
            game.makeMove(4);
            message.channel.send(`${game}`);
        }


        /* ===== !ttt status ===== */
        if (args[0].toLowerCase() === 'status') {
            message.channel.send(`!ttt status`);

            if (client.tictactoe.length === 0) { // if no games running
                message.reply(`Try '!tictactoe start' to start a game!`);
                return;
            }

            message.channel.send(`Last game: ${client.tictactoe[client.tictactoe.length - 1]}`)
            return;
        }

        /* ===== !ttt leave ===== */
        if (args[0].toLowerCase() === 'leave') {
            message.channel.send(`!ttt leave`);
            return;
        }

        // If you've reached here, the inputed arguments are invalid
        message.channel.send(`Print help menu for this fool`);

    },
};
