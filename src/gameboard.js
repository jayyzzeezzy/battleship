import {
    playRound, 
    b1,
    b2,
    boardOne,
    boardTwo,
    currentPlayer,
    madeMove,
    playerMadeAMove,
} from "./index";

class Gameboard {
    constructor() {
        this.board = [];
        this.totalShips = 3;
        this.shipSunk = 0;

        this.orientation = "vertical";
        this.endgame = false;
        this.clicked = false;
    };

    makeBoard() {
        for (let i = 0; i < 10; i++) {
            this.board[i] = [];

            for (let j = 0; j < 10; j++) {
                this.board[i][j] = null;
            }
        }
    };

    getTailValue(x, y) {
        return this.board[x][y];
    }; 

    placeShip(x, y, ship, orientation) {
        let size = x + ship.length;
        if (size < 10) {
            for (let i = 0; i < ship.length; i++) {
                if (orientation == "vertical") {
                this.board[x + i][y] = ship;
                }
            }
        } else {
            return "err";
        };
       
    };

    receiveAttack(x, y) {
        if (this.board[x][y] == null) {
            this.board[x][y] = "missed";
            return;
        } else if (this.board[x][y] == "missed") {
            return;
        } else if (this.board[x][y] == "hitted") {
            return;
        } else {
            const ship = this.board[x][y];
            ship.hit();

            this.board[x][y] = "you hitted a ship";

            if (ship.isSunk) this.shipSunk++;
            this.gameOver();
        }
    };

    gameOver() {
        if (this.shipSunk == this.totalShips) {
            this.endgame = true;
            return alert("game over");
        }
    };

    printBoard(board, attackBy, currentBoard) {
        this.clicked = false;

        for (let i = 0; i < 10; i++) {
            const r = document.createElement('div');
            board.appendChild(r).className = "make";

            for (let j = 0; j < 10; j++) {
                const c = document.createElement('div');
                c.setAttribute("class", "cell");
               
                if (this.board[i][j] == "missed") {
                    c.style.backgroundColor = "gray";
                } else if (this.board[i][j] == "you hitted a ship") {
                    c.style.backgroundColor = "red";
                } else if (this.board[i][j]) {

                    // only show left side board
                    if (currentBoard == "left") {
                        c.style.backgroundColor = "black";
                    } else {
                        c.style.backgroundColor = "white";
                    }
                } else {
                    c.style.backgroundColor = "white";
                }
                r.appendChild(c);

                c.addEventListener("click", () => {
                    if (attackBy == "player") {
                        if (!this.endgame) {
                        // player can only click on right side board
                        
                            this.receiveAttack(i, j);
                            if (this.board[i][j] == null || this.board[i][j] == "missed") {
                                c.style.backgroundColor = "gray";
                            } else if (this.board[i][j] == "you hitted a ship") {
                                c.style.backgroundColor = "red";
                            }

                            this.clicked = true;
                            attackBy = "block next move";
                            playerMadeAMove(true);
                        }
                    }
                });
            }
        }
    };

    computerRandomAttack() {
        if (!this.endgame) {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            console.log(x);
            console.log(y);

            this.receiveAttack(x, y);
        }
    };
};

export default Gameboard;