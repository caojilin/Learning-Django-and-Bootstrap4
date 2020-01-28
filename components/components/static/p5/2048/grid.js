class Grid {
    constructor() {
        this.num_row = 4;
        this.w = width / this.num_row;
        this.board = this.makeEmpty();

        this.lastAdded = null;
    }

    makeEmpty() {
        let board = [];
        for (let i = 0; i < this.num_row; i++) {
            let row = [];
            for (let j = 0; j < this.num_row; j++) {
                row[j] = 0;
            }
            board[i] = row;
        }
        return board;
    }

    show() {
        for (let i = 0; i < this.num_row; i++) {
            for (let j = 0; j < this.num_row; j++) {
                let val = this.board[i][j];
                push();
                if (val === 0) {
                    fill('#eee4da');
                } else if (val === 2) {
                    fill('#e8d3ae');
                } else if (val === 4) {
                    fill('#ede0c8');
                } else if (val === 8) {
                    fill('#f2b179');
                } else if (val === 16 || val === 32) {
                    fill('#f59563');
                } else if (val === 64) {
                    fill('#f65e3b');
                } else if (val === 128) {
                    fill('#edcf72');
                } else if (val === 64) {
                    fill('#f65e3b');
                }
                // stroke(0);
                rect(i * this.w, j * this.w, this.w, this.w);
                pop();

                if (val !== 0) {
                    push();
                    textAlign(CENTER, CENTER);
                    let sizes = [64, 64, 52, 48];
                    let s = "" + val
                    textSize(sizes[s.length - 1]);
                    if (val === 2 || val === 4) {
                        fill('#2b2724');
                    } else {
                        fill('#f9f6f2');
                    }
                    noStroke();
                    text(val, i * this.w + this.w / 2, j * this.w + this.w / 2);
                    pop();
                }
            }
        }

    }

    addNumber() {
        let options = [];
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                if (this.board[i][j] === 0) {
                    options.push({
                        x: i,
                        y: j
                    });
                }
            }
        }
        if (options.length > 0) {
            let spot = random(options);
            if (random(1) > 0.5) {
                this.board[spot.x][spot.y] = 2;
            } else {
                this.board[spot.x][spot.y] = 4;
            }
            this.lastAdded = spot;
        }
    }


}