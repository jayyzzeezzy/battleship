import './style.css';
import Ship from "./ship";
import Player from "./player";

const startBtn = document.querySelector(".startBtn");
startBtn.addEventListener('click', () => {
    initGame();
});

export let currentPlayer;
export const b1 = document.querySelector('.board-one');
export const b2 = document.querySelector('.board-two');
export const attackBy = ["player", "computer"];
export const playerOne = new Player("player");
export const playerTwo = new Player("computer");
export const boardOne = playerOne.board;
export const boardTwo = playerTwo.board;

function initGame() {
    boardOne.makeBoard();
    boardTwo.makeBoard();

    boardOne.placeShip(2, 2, new Ship(3), "vertical");
    boardOne.placeShip(5, 5, new Ship(3), "vertical");
    boardOne.placeShip(1, 9, new Ship(5), "vertical");

    boardTwo.placeShip(0, 2, new Ship(3), "vertical");
    boardTwo.placeShip(3, 4, new Ship(3), "vertical");
    boardTwo.placeShip(0, 6, new Ship(5), "vertical");

    let currentBoard = ["left", "right"];
    boardOne.printBoard(b1, "something", "left");
    boardTwo.printBoard(b2, "something");

    playRound(boardOne, boardTwo, b1, b2, "player");
};

function clearAll(b1, b2) {
    b1.innerHTML = "";
    b2.innerHTML = "";
};

// change player/computer turns
function playRound(boardOne, boardTwo, b1, b2, currentPlayer) {
    clearAll(b1, b2);

    // print both boards
    console.log(currentPlayer);
    if (currentPlayer === "player") {
        // print first board as it is and second with addEventListener
        boardOne.printBoard(b1, "something", "left");
        boardTwo.printBoard(b2, currentPlayer);
        if (boardTwo.clicked == true) {
            if (!boardOne.endgame && !boardTwo.endgame) {
                boardTwo.clicked = false;
                currentPlayer = "computer";
                playRound(boardOne, boardTwo, b1, b2, currentPlayer, currentBoard);
            }
        } 
    } else {
        // random attack and then print both boards
        boardOne.computerRandomAttack();
        boardOne.printBoard(b1, currentPlayer, "left");
        boardOne.printBoard(b2, "something");
    
        currentPlayer = "player";

        if (!boardOne.endgame && !boardTwo.endgame) {
            playRound(boardOne, boardTwo, b1, b2, currentPlayer);
        }
    }
};

let madeMove = false;

export function playerMadeAMove(change) {
    madeMove = change;

    if (madeMove) {
        madeMove = false;

        playRound(boardOne, boardTwo, b1, b2, "computer");
    }
};