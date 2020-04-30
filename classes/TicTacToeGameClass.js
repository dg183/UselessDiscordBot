
/**
 * Each instance of 'TicTacToeGame' is a new game
 * Each game has:
 *      - game board (array 1-9)
 *      - player 1 (<GuildMember>)
 *      - player 2 (<GuildMember>)
 * 
 */

class TicTacToeGame {
    constructor(player1, player2) {
        // if (!player1.equals(GuildMember) || !player2.equals(GuildMember)) {
        //     console.log("New ttt game, player not guildmember\n");
        //     return;
        // }

        this.board = new Array(9);
        for (let i = 0; i < 9; i++) {
            this.board[i] = 0;
        }
        this.player1 = player1;
        this.player2 = player2;
        this.boardSize = 3;
    };

    // TicTacToeGame.prototype.toString = function() {

    // }
    toString() {
        return "\nBoard = {\n" + this.boardToString() + "}\nPlayer 1 = " + this.player1.tag + "\nPlayer2 = " + this.player2.tag;
    }

    _printBoard() {
        for (let i = 0; i < 9; i++) {
            console.log(this.board[i]);
        }
        console.log(this.boardToString);
    }

    boardToString() {
        let bStr = "";

        let i = 0;
        while (i < this.boardSize ** 2) { // while i < 9

            bStr += this.board[i]; // add number

            if (i % this.boardSize != this.boardSize - 1) { // if not edge
                bStr += "|";
            } else {
                bStr += "\n";
                for (let j = 0; j < (2*this.boardSize - 1); j++) {
                    bStr += "-";
                }
                bStr += "\n";
            }
            

            i++;
        }
        return bStr;

    }
}

module.exports = TicTacToeGame;