import Ship from "./ship";

test('ship to have correct length', () => {
    expect(new Ship(4)).toHaveProperty('length', 4);
    expect(new Ship(3)).toHaveProperty('length', 3);
});

test('to throw error if length is not between 2 and 5', () => {
    expect(() => new Ship(1)).toThrow();
    expect(() => new Ship(1)).toThrow();
    expect(() => new Ship(6)).toThrow();
});

test('hit() to increase number of times ship gets hit', () => {
    const ship = new Ship(4);
    expect(ship).toHaveProperty('hits', 0);

    ship.hit();
    expect(ship).toHaveProperty('hits', 1);

    ship.hit();
    expect(ship).toHaveProperty('hits', 2);
});

test('ship is sunk if hits equals ship length', () => {
    const ship = new Ship(2);
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.isSunk()).toBe(true);
});
