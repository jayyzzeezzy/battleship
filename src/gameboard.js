import {
    playRound, 
    b1,
    b2,
    boardOne,
    boardTwo,
    currentPlayer,
    dgDrop,
    dgOver,
    madeMove,
    playerMadeAMove,
} from "./index";

class Gameboard {
    constructor() {
        this.board = [];
        // total squares of all ships
        this.totalShips = 15;
        this.shipSunk = 0;

        this.position = "vertical";
        this.endgame = false;
        this.clicked = false;
        this.shipPlaced = false;
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

    placeShip(x, y, ship, position, b1) {
        let canPlaceShip = false;
        if (b1 == "b1") {
            canPlaceShip = false;
            if (position == "horizontal") {
                let size = y + ship.length - 1;
                if (size < 10) {
                    for (let i = 0; i < ship.length; i++) {
                        //console.log(this.board[x + i][y]);
                        if (this.board[x][y + i] != null) {
                            canPlaceShip = false;
                            this.shipPlaced = false;
                            return "can't place ship here";
                        } else {
                            canPlaceShip = true;
                            this.shipPlaced = true;
                        }
                    }
                } else {
                    this.shipPlaced = false;
                    return "can't place ship here";
                }
            } else if (position == "horizontal") {
                let size = x + ship.length - 1;
                if (size < 10) {
                    for (let i = 0; i < ship.length; i++) {
                        //console.log(this.board[x + i][y]);
                        if (this.board[x + i][y] != null) {
                            canPlaceShip = false;
                            this.canPlaceShip = false;
                        return "can't place ship here";
                        } else {
                            this.canPlaceShip = true;
                            canPlaceShip = true;
                        }
                    }
                } else {
                    this.canPlaceShip = false;
                    return "can't place ship here";
                }
            }

        } else {
            canPlaceShip = true;
        }

        if (canPlaceShip) {
            canPlaceShip = false;
            if (position == "vertical") {
                let size = x + ship.length - 1;
                if (size < 10) {
                    for (let i = 0; i < ship.length; i++) {
                        if (this.board[x + i][y] == null) {
                            this.board[x + i][y] = ship;
                        } else {
                            return "can't place ship here";
                        }
                    }
                } else return "can't place ship here";
            } else if (position == "horizontal") {
                let size = y + ship.length - 1;
                if (size < 10) {
                    for (let i = 0; i < ship.length; i++) {
                        if (this.board[x][y + i] == null) {
                            this.board[x][y + i] = ship;
                        } else {
                            return "can't place ship here";
                        }
                    }
                } else return "can't place ship here";
            }
        }
    };

    receiveAttack(x, y) {
        if (this.board[x][y] == null) {
            this.board[x][y] = "missed";
            return;
        } else if (this.board[x][y] == "missed") {
            return "invalid move";
        } else if (this.board[x][y] == "you hitted a ship") {
            return "invalid move";
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
                c.setAttribute("x", i);
                c.setAttribute("y", j);
                r.appendChild(c);

                c.addEventListener("click", () => {
                    if (attackBy == "player") {
                        if (!this.endgame) {
                        // player can only click on right side board
                        
                            if (
                                this.board[i][j] != "missed" &&
                                this.board[i][j] != "you hitted a ship"
                                ) {
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
                    }
                });
            }
        }
    };

    computerRandomAttack() {
        if (!this.endgame) {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);


            if (
                this.board[x][y] != "missed" &&
                this.board[x][y] != "you hitted a ship"
            ) {
                this.receiveAttack(x, y);
            } else {
                this.computerRandomAttack();
            }
        }
    };
};

export default Gameboard;