let board_original = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];


let board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

let board2_original = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]];

let board2 = [
    [3, 0, 6, 5, 0, 8, 4, 0, 0],
    [5, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 3, 1],
    [0, 0, 3, 0, 1, 0, 0, 8, 0],
    [9, 0, 0, 8, 6, 3, 0, 0, 5],
    [0, 5, 0, 0, 9, 0, 6, 0, 0],
    [1, 3, 0, 0, 0, 0, 2, 5, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 4],
    [0, 0, 5, 2, 0, 6, 3, 0, 0]];


let existed_indices = [];
let to_be_filled_indices = [];

function helper(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] !== 0) {
                existed_indices.push([i, j]);
            } else {
                to_be_filled_indices.push([i, j]);
            }
        }
    }
}

let arr = [];
let count = 0;
let instant_solve = false;
let k = 0;
let sidebar_w = 241;
let current_board;
let current_board_original;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');

    button = createButton('instant');
    button.position(sidebar_w + width + 50, 100);
    button.style('font-size', 18 + 'px');
    button.mousePressed(instant);

    button = createButton('another example');
    button.position(sidebar_w + width + 50, 150);
    button.style('font-size', 18 + 'px');
    button.mousePressed(another);

    helper(board_original);
    back(board);
    current_board = board;
    current_board_original = board_original;
}

function another() {
    existed_indices = [];
    to_be_filled_indices = [];
    arr = [];
    helper(board2_original);
    back(board2);
    current_board = board2;
    current_board_original = board2_original;
    k = 0;
}

function instant() {
    instant_solve = true;
}

function draw() {
    frameRate(60);
    background(225);
    let h = width / 9;
    let temp = JSON.parse(arr[k]);

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            rect(j * h, i * h, h, h);
        }
    }

    for (let i = 0; i < existed_indices.length; i++) {
        let x = existed_indices[i][0];
        let y = existed_indices[i][1];
        push();
        textSize(28);
        textAlign(CENTER, CENTER);
        // fill('black');
        let number = current_board_original[x][y];
        text(number, y * h + h / 2, x * h + h / 2);
        pop();
    }

    if (!instant_solve) {
        for (let i = 0; i < to_be_filled_indices.length; i++) {
            let x = to_be_filled_indices[i][0];
            let y = to_be_filled_indices[i][1];
            push();
            textSize(28);
            textAlign(CENTER, CENTER);
            fill('blue');
            let number = temp[x][y];
            if (number !== 0) {
                text(temp[x][y], y * h + h / 2, x * h + h / 2);
            }
            pop();
        }
    } else {
        for (let i = 0; i < to_be_filled_indices.length; i++) {
            let x = to_be_filled_indices[i][0];
            let y = to_be_filled_indices[i][1];
            push();
            textSize(28);
            textAlign(CENTER, CENTER);
            fill('blue');
            let number = current_board[x][y];
            if (number !== 0) {
                text(current_board[x][y], y * h + h / 2, x * h + h / 2);
            }
            pop();
        }
    }
    if (k < arr.length - 1) {
        k += 1;
    }
}


function back(board, position = [0, 0]) {
    let str = JSON.stringify(board);
    arr.push(str);
    count += 1;
    if (position[0] === -1 && position[1] === -1) {
        console.log("success");
        return true;
    }
    let pos_x = position[0];
    let pos_y = position[1];
    let pos_value = board[pos_x][pos_y];
    if (pos_value === 0) {
        for (let num = 1; num < 10; num++) {
            if (is_valid(board,position, num)) {
                board[pos_x][pos_y] = num;
                let next_position = get_next_position(board, position);
                if (back(board, next_position)) {
                    return true;
                } else {
                    board[pos_x][pos_y] = 0;
                }
            }
        }
    } else {
        let next_position = get_next_position(board, position);
        back(board, next_position);
    }
    return false;
}


function is_valid(board, position, number) {
    let pos_x = position[0];
    let pos_y = position[1];

    let row = board[pos_x];
    let col = [];
    for (let i = 0; i < 9; i++) {
        col.push(board[i][pos_y])
    }
    let block = [];
    let b_x = Math.floor(pos_x / 3) * 3;
    let b_y = Math.floor(pos_y / 3) * 3;
    for (let i = b_x; i < b_x + 3; i++) {
        for (let j = b_y; j < b_y + 3; j++) {
            block.push(board[i][j])
        }
    }

    for (let i = 0; i < row.length; i++) {
        if (number === row[i]) {
            return false;
        }
    }

    for (let i = 0; i < col.length; i++) {
        if (number === col[i]) {
            return false;
        }
    }

    for (let i = 0; i < block.length; i++) {
        if (number === block[i]) {
            return false;
        }
    }
    return true;
}

function get_next_position(board, position) {
    let pos_x = position[0];
    let pos_y = position[1];
    while (board[pos_x][pos_y] !== 0) {
        pos_y += 1;
        if (pos_y >= board.length) {
            pos_x += 1;
            pos_y = 0
        }
        if (pos_x >= board.length) {
            return [-1, -1]
        }
    }
    return [pos_x, pos_y]
}




