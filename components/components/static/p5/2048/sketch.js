let grid;
let score = 0;

function setup() {
    let canvas = createCanvas(500, 500);
    canvas.parent("sketch-holder");
    noLoop();
    grid = new Grid();
    grid.addNumber();
    grid.addNumber();
    updateCanvas();
}

function updateCanvas() {
    background(255);
    grid.show();
    select('#score').html(score);
}

function combine(row) {
    for (let i = row.length; i >= 1; i--) {
        if (row[i] === row[i - 1]) {
            row[i] = row[i - 1] + row[i];
            score += row[i];
            row[i - 1] = 0;
        }
    }
    return row
}

function slide(row) {
    let arr = row.filter(val => val);
    let missing = row.length - arr.length;
    let zeros = Array(missing).fill(0);
    return zeros.concat(arr);
}

function operate(board) {
    for (let i = 0; i < board.length; i++) {
        board[i] = slide(board[i]);
        board[i] = combine(board[i]);
        board[i] = slide(board[i]);
    }
    return board;
}

function gridFlip(board) {
    for (let i = 0; i < board.length; i++) {
        board[i].reverse();
    }
    return board;
}

function gridRotate(board) {
    newBoard = grid.makeEmpty();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            newBoard[i][j] = board[j][i];
        }
    }
    return newBoard;
}

function copyGrid(board) {
    let newArray = [];
    for (let i = 0; i < board.length; i++) {
        newArray[i] = board[i].slice();
    }
    return newArray;
}

function gridEqual(a, b) {
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[0].length; j++) {
            if (a[i][j] !== b[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function gameWon() {
    for (let i = 0; i < grid.num_row; i++) {
        for (let j = 0; j < grid.num_row; j++) {
            if (grid.board[i][j] === 2048){
                return true
            }
        }
    }
    return false;
}

function isGameOver() {
    for (let i = 0; i < grid.num_row; i++) {
        for (let j = 0; j < grid.num_row; j++) {
            if (grid.board[i][j] === 0) {
                return false;
            }
            if (j !== 3 && grid.board[i][j] === grid.board[i][j + 1]) {
                return false;
            }
            if (i !== 3 && grid.board[i][j] === grid.board[i + 1][j]) {
                return false;
            }
        }
    }
    return true;
}

function keyPressed() {
    let past_board = copyGrid(grid.board);

    if (keyCode === DOWN_ARROW) {
        grid.board = operate(grid.board);
    } else if (keyCode === UP_ARROW) {
        grid.board = gridFlip(grid.board);
        grid.board = operate(grid.board);
        grid.board = gridFlip(grid.board);
    } else if (keyCode === RIGHT_ARROW) {
        grid.board = gridRotate(grid.board);
        grid.board = operate(grid.board);
        grid.board = gridRotate(grid.board);
    } else if (keyCode === LEFT_ARROW) {
        grid.board = gridRotate(grid.board);
        grid.board = gridFlip(grid.board);
        grid.board = operate(grid.board);
        grid.board = gridFlip(grid.board);
        grid.board = gridRotate(grid.board);
    }
    // if board not moved, don't add new number
    if (!gridEqual(past_board, grid.board)) {
        grid.addNumber();
    }

    updateCanvas();

    if (isGameOver()) {
        console.log("Game Over");
    }
    if (gameWon()){
        console.log("Game Won");
    }
}

