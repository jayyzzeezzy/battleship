import './style.css';
import Ship from "./ship";
import Player from "./player";

const randomize = document.querySelector(".randomize");
const rotateBtn = document.querySelector(".rotateBtn");
const clearBtn = document.querySelector(".clearBtn");
const ships = document.querySelector(".ships");

rotateBtn.style.display = "none";

let canClickAgain = true;
let shipsPlaced = 0;
let canDragShips = true;
let position = "horizontal";

const startBtn = document.querySelector(".startBtn");
startBtn.addEventListener('click', () => {
    if (canClickAgain) {
        initGame();
        canClickAgain = false;
        startBtn.style.display = "none";
        rotateBtn.style.display = "flex";
    }
});

function clearAfterPlace() {
    document.querySelector(".shipContainer").style.display = "none";
    const startGame = document.createElement("button");
    startGame.textContent = "Start Game";
    clearBtn.appendChild(startGame);
    startGame.addEventListener("click", () => {
        playRound(boardOne, boardTwo, b1, b2, "player");
        clearBtn.style.display = "none";
        rotateBtn.style.display = "none";
        randomize.style.display = "none";
    });
}

let currentPlayer;
const b1 = document.querySelector('.board-one');
const b2 = document.querySelector('.board-two');
// const attackBy = ["player", "computer"];
const playerOne = new Player("player");
const playerTwo = new Player("computer");
const boardOne = playerOne.board;
const boardTwo = playerTwo.board;

function initGame() {
    boardOne.makeBoard();
    boardTwo.makeBoard();

    const randomBtn = document.createElement("button");
    randomBtn.textContent = "Randomize";
    randomBtn.classList.add('randomBtn');

    randomBtn.addEventListener("click", () => {
        b1.innerHTML = "";
        clearBtn.innerHTML = "";
        boardOne.makeBoard();
        randomShipPlacment(boardOne, 5);
        randomShipPlacment(boardOne, 3);
        randomShipPlacment(boardOne, 3);
        randomShipPlacment(boardOne, 2);
        randomShipPlacment(boardOne, 2);
        canDragShips = false;

        boardOne.printBoard(b1, "something", "left");
        clearAfterPlace();
    });
    randomize.appendChild(randomBtn);
  
    randomShipPlacment(boardTwo, 5);
    randomShipPlacment(boardTwo, 3);
    randomShipPlacment(boardTwo, 3);
    randomShipPlacment(boardTwo, 2);
    randomShipPlacment(boardTwo, 2);
    shipsForDragAndDrop(boardOne);

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
    if (currentPlayer === "player") {
        // print first board as it is and second with addEventListener
        boardOne.printBoard(b1, "something", "left");
        boardTwo.printBoard(b2, currentPlayer);
        if (boardTwo.clicked == true) {
            if (!boardOne.endgame && !boardTwo.endgame) {
                boardTwo.clicked = false;
                currentPlayer = "computer";
                playRound(boardOne, boardTwo, b1, b2, currentPlayer);
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

function randomShipPlacment(first, length) {
    let ship1X = Math.floor(Math.random() * 10);
  
    let ship1Y = Math.floor(Math.random() * 10);
    let placment = Math.random() < 0.5 ? "horizontal" : "vertical";
    if (
        first.placeShip(ship1X, ship1Y, new Ship(length), placment) ==
        "can't place ship here"
    ) {
        randomShipPlacment(first, length);
    } else first.placeShip(ship1X, ship1Y, new Ship(length), placment);
  }

function shipsForDragAndDrop(first) {
    ships.style.display = "flex";
    let selected;
    let ship = document.querySelectorAll(".ship");
    ship.forEach((s) => {
        s.addEventListener("dragstart", (e) => {
        selected = e.target.id;
        });
    });
    b1.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    b1.addEventListener("drop", (e) => {
        b1.innerHTML = "";
        e.preventDefault();

        let newX = e.target;
        let x = parseInt(newX.getAttribute("x"));
        let newY = e.target;
        let y = parseInt(newY.getAttribute("y"));

        first.placeShip(
            x, 
            y, 
            new Ship(parseInt(selected)), 
            position, 
            "b1"
        );

        if (first.shipPlaced == true) {
            document.getElementById(selected).outerHTML = "";
            shipsPlaced++;
            if (shipsPlaced == 5) {
                playRound();
            }
        }
        console.log(first.shipPlaced);

        x = null;
        y = null;
        selected = null;
        first.printBoard(b1, "something", "left");
        // }
    });
}

rotateBtn.addEventListener('click', () => {
    let allShips = document.querySelectorAll(".ship");

  if (position == "vertical") {
    allShips.forEach((ship) => {
        if (ship.id == 5) {
            ship.style.width = "250px";
            ship.style.height = "50px";
        } else if (ship.id == 3) {
            ship.style.width = "150px";
            ship.style.height = "50px";
        } else if (ship.id == 2) {
            ship.style.width = "100px";
            ship.style.height = "50px";
        }

        position = "horizontal";
        console.log(position);
    });
  } else {
    allShips.forEach((ship) => {
        if (ship.id == 5) {
            ship.style.width = "50px";
            ship.style.height = "250px";
        } else if (ship.id == 3) {
            ship.style.width = "50px";
            ship.style.height = "150px";
        } else if (ship.id == 2) {
            ship.style.width = "50px";
            ship.style.height = "100px";
        }
        position = "vertical";
        console.log(position);
    });
  }
});