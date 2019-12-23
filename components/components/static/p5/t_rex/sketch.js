// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/147-chrome-dinosaur.html
// https://youtu.be/l0HoJHc-63Q

// Google Chrome Dinosaur Game (Unicorn, run!)
// https://editor.p5js.org/codingtrain/sketches/v3thq2uhk

let t_rex;
let trains = [];
function setup() {
    let myCanvas = createCanvas(800, 450);
    myCanvas.parent('myContainer')
    t_rex = new T_Rex();
}

function keyPressed() {
    if (key == ' ') {
        t_rex.jump();
    }
}

function draw() {

    if (random(1) < 0.005) {
        trains.push(new Train());
    }
    for (let t of trains) {
        t.move();
        t.show();
        if (t_rex.hits(t)) {
            console.log('game over');
            noLoop();
        }
    }
    t_rex.show();
    t_rex.move();
}