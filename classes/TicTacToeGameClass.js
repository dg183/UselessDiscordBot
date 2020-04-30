let winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];

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
        let currPlayer = (this.turn == 1) ? this.player1 : this.player2;
        // return "\nBoard = {\n" + this.boardToString() + "}\nPlayer 1 = " + this.player1.tag + "\nPlayer2 = " + this.player2.tag;
        return `\nBoard = {\n${this.boardToString()}\n}\nPlayer 1 = ${this.player1}\n\
Player2 = ${this.player2}\nCurrent turn belongs to Player ${currPlayer}`;
    }

    /**
     * Print board to console (for debugging)
     */
    _printBoard() {
        for (let i = 0; i < 9; i++) {
            console.log(this.board[i]);
        }
        console.log(this.boardToString);
    }


    /**
     * Turn board into a pretty string (tic-tac-toe grid)
     * Returns: String
     */
    boardToString() {
        let bStr = "";

        let i = 0;
        while (i < this.boardSize ** 2) { // while i < 9

            switch (this.board[i]) {
                case 0:
                    bStr += "   ";
                    break;
                case 1:
                    bStr += "X";
                    break;
                case 2:
                    bStr += "O";
                    break;
            }

            if (i % this.boardSize != this.boardSize - 1) { // if not edge
                bStr += " | ";
            } else if (i != this.boardSize ** 2 - 1) { // if last square, don't print horizontal line
                bStr += "\n";
                for (let j = 0; j < (3*this.boardSize + 1); j++) {
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

    /**
     * Called when current player makes a move
     * @param {Integer} position - position to place piece on board
     * 
     * Returns:
     * * 0 if valid move 
     * * 1 if Player 1 won
     * * 2 if Player 2 won
     * * 3 if Tie
     * * 4 if invalid position (out of bounds)
     * * 5 if position already occupied
     */
    makeMove(position) {

        /* Checking for valid inputs */
        if (position < 1 || position > 9) {
            return 3; // position out of bounds
        }

        /* Shift index for 0-indexed array*/
        let index = position - 1;
        if (this.board[index] !== 0) {
            return 4; // position already occupied
        }

        /* Place piece in position */
        this.board[index] = this.turn; 

        /* Check if that was game winning move */
        let winner = this._checkWinner();

        // If winner
        switch (winner) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 3:
                return 3;
        }

        /* Alternate turn */
        this.nextTurn();
        
        return 0;
    }

    /**
     * Checks the board for a winner
     * 
     * Returns:
     * * 0 if game still going
     * * 1 if Player 1 wins
     * * 2 if Player 2 wins
     * * 3 if Tie
     */
    _checkWinner() {
        // Check for winner
        for (let i = 0; i < winningCombinations.length; i++) {
            let c = winningCombinations[i];
            let board = this.board;

            // check if 3 in a row equal
            if (board[c[0]] === board[c[1]] && board[c[1]] === board[c[2]]) { 
                return board[c[0]]; // returns player who won based on pieces on board
            }
        }

        // If no winner, check for tie
        for (let i = 0; i < this.board.length; i++) {
            // If 0 found, board not full yet
            if (this.board[i] == 0) {
                return 0; // Game still going, return 0
            }
        }

        // If reached here, then tie
        return 3;
    }


}

module.exports = TicTacToeGame;