import Gameboard from "./gameboard";

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