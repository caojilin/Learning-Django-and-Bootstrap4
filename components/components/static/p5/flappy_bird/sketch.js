const TOTAL = 100;
let birds = [];
let savedBirds = [];
let pipes = [];
let counter = 0;
let slider;
let score = 0;
let num_generations = 0;

function keyPressed() {
    if (key === 'S') {
        let bird = birds[0];
        saveJSON(bird.brain, 'bird.json');
    }
}

function setup() {
    let canvas = createCanvas(640, 480);
    canvas.parent("sketch-holder");
    tf.setBackend('cpu');
    slider = createSlider(1, 10, 1);
    slider.position(300, 550);
    for (let i = 0; i < TOTAL; i++) {
        birds[i] = new Bird();
    }
}

function draw() {
    for (let n = 0; n < slider.value(); n++) {
        if (counter % 75 == 0) {
            pipes.push(new Pipe());
        }
        counter++;

        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();

            for (let j = birds.length - 1; j >= 0; j--) {
                if (pipes[i].hits(birds[j])) {
                    savedBirds.push(birds.splice(j, 1)[0]);
                }
            }

            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
                score += 1;
            }
        }

        for (let i = birds.length - 1; i >= 0; i--) {
            if (birds[i].offScreen()) {
                savedBirds.push(birds.splice(i, 1)[0]);
            }
        }

        for (let bird of birds) {
            bird.think(pipes);
            bird.update();
        }

        if (birds.length === 0) {
            counter = 0;
            nextGeneration();
            pipes = [];
            score = 0;
            num_generations += 1;
        }
    }

    // All the drawing stuff
    background(0);
    textSize(18);
    text('score:' + score, 10, 30);

    textSize(18);
    text('generations:' + num_generations, 10, 46);

    textSize(18);
    text('total/alive:' + TOTAL + "/" + birds.length, 10, 64);

    for (let bird of birds) {
        bird.show();
    }

    for (let pipe of pipes) {
        pipe.show();
    }
}

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }
