
/**
 * Each instance of 'TicTacToeGame' is a new game
 * Each game has:
 *      - game board (array 1-9)
 *      - player 1 (<GuildMember>)
 *      - player 2 (<GuildMember>)
 * 
 * Player 1 = X
 * Player 2 = O
 * 
 * Default player 1 starts
 * 
 */

class TicTacToeGame {
    /**
     * Board = [0,0,0,0,0,0,0,0,0] (len = 9)
     * Turn = 1
     * @param {GuildMember} player1 
     * @param {GuildMember} player2 
     */
    constructor(player1, player2) {
        this.board = new Array(9);
        for (let i = 0; i < 9; i++) {
            this.board[i] = 0;
        }
        this.player1 = player1;
        this.player2 = player2;
        this.boardSize = 3;
        this.turn = 1; // start with player 1's turn
    };


    /**
     * Override for default toString() function
     * Prints pretty board, player 1, player 2, current turn
     * Returns: String
     */
    toString() {
        // return "\nBoard = {\n" + this.boardToString() + "}\nPlayer 1 = " + this.player1.tag + "\nPlayer2 = " + this.player2.tag;
        return `\nBoard = {${this.boardToString()}}\nPlayer 1 = ${this.player1.tag}\n\
Player2 = ${this.player2.tag}\nCurrent turn belongs to Player ${this.turn}`;
    }

    _printBoard() {
        for (let i = 0; i < 9; i++) {
            console.log(this.board[i]);
        }
        console.log(this.boardToString);
    }


    /**
     * TUrn board into a pretty string (tic-tac-toe grid)
     * Returns: String
     */
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

    /**
     * Change to next player's turn
     * Returns: None
     */
    nextTurn() {
        if (this.turn == 1) {
            this.turn = 2;
        } else {
            this.turn = 1;
        }
    }


}

module.exports = TicTacToeGame;