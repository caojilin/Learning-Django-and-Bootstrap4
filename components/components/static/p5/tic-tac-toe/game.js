class Game {
    constructor() {
        this.board = [];
        // for (let i = 0; i < 3; i++) {
        //     this.this.board[i] = ['', '', ''];
        // }
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.h = height / 3;
        this.w = width / 3;
        this.index = null;
        this.player1 = 'X';
        this.player2 = 'O';
        this.currentPlayer = this.player1;
        this.moves = 0;
    }

    show() {
        this.draw_board_lines();
        let xr = this.w / 4;
        if (this.index !== null) {
            let i = this.index[0];
            let j = this.index[1];
            if (this.board[i][j] == '') {
                this.moves += 1;
                this.board[i][j] = this.currentPlayer;
                if (this.currentPlayer == this.player1) {
                    this.currentPlayer = this.player2;
                } else {
                    this.currentPlayer = this.player1;
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] == this.player1) {
                    line(i * this.w + xr, j * this.h + xr, (i + 1) * this.w - xr, (j + 1) * this.h - xr);
                    line(i * this.w + xr, (j + 1) * this.h - xr, (i + 1) * this.w - xr, j * this.h + xr);
                } else if (this.board[i][j] == this.player2) {
                    ellipse(i * this.w + 2 * xr, j * this.h + 2 * xr, xr * 2);
                }
            }
        }
    }


    draw_board_lines() {
        for (let i = 0; i <= 3; i++) {
            line(0, this.h * i, width, this.h * i);
        }
        for (let i = 0; i <= 3; i++) {
            line(this.w * i, 0, this.w * i, height);
        }
    }

    get_current_player_index() {
        let x = null;
        let y = null;

        if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0) {
            return null;
        }

        for (let i = 0; i < 3; i++) {
            if (mouseX >= i * this.w && mouseX <= this.w + this.w * i) {
                x = i;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (mouseY >= i * this.h && mouseY <= this.h + this.h * i) {
                y = i;
            }
        }
        return [x, y];
    }

    equals3(a, b, c) {
        return (a == b && b == c && a != '');
    }

    check_win() {
        let winner = null;
        // horizontal
        for (let i = 0; i < 3; i++) {
            if (this.equals3(this.board[i][0], this.board[i][1], this.board[i][2])) {
                winner = this.board[i][0];
            }
        }
        // Vertical
        for (let i = 0; i < 3; i++) {
            if (this.equals3(this.board[0][i], this.board[1][i], this.board[2][i])) {
                winner = this.board[0][i];
            }
        }

        // Diagonal
        if (this.equals3(this.board[0][0], this.board[1][1], this.board[2][2])) {
            winner = this.board[0][0];
        }
        if (this.equals3(this.board[2][0], this.board[1][1], this.board[0][2])) {
            winner = this.board[2][0];
        }

        if (winner == null && this.moves == 9) {
            return 'tie';
        } else {
            return winner;
        }
    }
}