import Gameboard from "./gameboard";
import Ship from "./ship";

let testBoard;
beforeEach(() => {
    testBoard = new Gameboard();
})

test('gameboard has the correct amount of cells', () => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
        arr[i] = [];
        for (let j = 0; j < 10; j++) {
            arr[i][j] = null;
        }
    }

    testBoard.makeBoard();
    expect(testBoard.board).toEqual(arr);
});

test('ship is placed at the desired coordinate', () => {
    testBoard.makeBoard();
    const ship = new Ship(3);
    testBoard.placeShip(2, 2, ship, "horizontal");
    const expectShip = testBoard.getTailValue(4, 2);
    expect(expectShip).toEqual(ship);
});

test('ship is placed correctly and have the correct length', () => {
    testBoard.makeBoard();
    testBoard.placeShip(3, 3, 4);
    expect(testBoard.board[3][3]).toEqual(new Ship(4));
});

test('receiveAttack output correctly', () => {
    testBoard.makeBoard();
    testBoard.placeShip(2, 2, 3);
    const missTarget = testBoard.receiveAttack(5, 5);
    expect(missTarget).toMatch("missed");
});