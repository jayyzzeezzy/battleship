class Ship {
    constructor(length) {
        if (length < 2 || length > 5) {
            throw new Error('Ship\'s length must be between 2 and 5!');
        }
        this.length = length;
        this.hits = 0;
    };

    hit() {
        if (this.hits < this.length) this.hits++;
    };

    isSunk() {
        return this.hits >= this.length;
    };
};

export default Ship;