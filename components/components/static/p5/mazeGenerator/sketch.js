var cols, rows;
var w = 30;
var grid = [];
var current;
var stack = [];
var fps = 30;
var pause = false;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    cols = floor(width / w);
    rows = floor(height / w);
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            grid.push(new Cell(i, j));
        }
    }
    current = grid[0];

    var sidebar_w = 241;
    frameRate(fps);

    inp1 = createInput('fps:30');
    inp1.position(sidebar_w + 650, 150);
    inp1.style('font-size', 20 + 'px');
    inp1.input(changeFPS);

    fpsDisplay = createDiv('');
    fpsDisplay.style('font-size', '18pt');
    fpsDisplay.position(sidebar_w + 650, 200);

    inp2 = createInput('size:20x20');
    inp2.position(sidebar_w + 650, 250);
    inp2.style('font-size', 20 + 'px');
    inp2.input(generateNewWorld);

    button2 = createButton('instant');
    button2.position(sidebar_w + 650, 300);
    button2.style('font-size', 24 + 'px');
    button2.mousePressed(instant);
}

function mouseClicked() {
    if (mouseX < width && mouseX > 0 && mouseY > 0 && mouseY < height) {
        pause = !pause;
        if (pause) {
            noLoop();
        } else {
            loop();
        }
    }
}

function instant() {
    //STEP 1.1
    while (stack.length > 0) {
        //STEP 2.2
        current = stack.pop();
        current.highlight();
        var next = current.checkNeighbors();
        if (next) {
            //STEP 2.2.1
            stack.push(current);
            //STEP 2.2.3
            removeWalls(current, next);
            //STEP 2.2.4
            next.visited = true;
            stack.push(next);
        }
    }
}



function generateNewWorld() {
    if (inp2.value() == '') {
        noLoop();
    } else {
        loop();
        w = floor(width / inp2.value());
        grid = [];
        cols = floor(width / w);
        rows = floor(height / w);
        for (var j = 0; j < cols; j++) {
            for (var i = 0; i < rows; i++) {
                grid.push(new Cell(i, j));
            }
        }
        current = grid[0];
        stack = [];
        stack.push(current);
    }

}

function changeFPS() {
    console.log(inp1.value());
    fps = parseInt(inp1.value());
    frameRate(fps);
}

function draw() {
    background(220);
    for (let cell of grid) {
        cell.show();
    }

    fpsDisplay.html("fps:" + fps);

    //STEP 1.1
    current.visited = true;
    current.highlight();
    //STEP 2.2
    var next = current.checkNeighbors();
    if (next) {
        //STEP 2.2.1
        stack.push(next)
        //STEP 2.2.3
        removeWalls(current, next);
        //STEP 2.2.4
        next.visited = true;
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }

}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.visited = false;
    //top, right, bottom, left
    this.walls = [true, true, true, true];

    this.checkNeighbors = function () {
        var neighbors = [];
        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    };
    this.highlight = function () {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill('green');
        ellipseMode(CENTER);
        ellipse(x + w / 2, y + w / 2, w / 2, w / 2);
    };

    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;
        stroke('black');

        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y + w, x, y);
        }
        if (this.visited) {
            noStroke();
            fill(178, 102, 255, 150);
            rect(x, y, w, w);
        }
    }
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}