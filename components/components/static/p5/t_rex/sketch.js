let rocks = [];
let score = 0;
let rock_img;
let t_rex_img;
let slider;
let counter = 0;
// let t_rex;

let current_rock_speed = 7;
const TOTAL = 100;
let dinosaurs = [];
let savedDinosaurs = [];

// function preload() {
//     rock_img = loadImage(rock_image_url);
//     t_rex_img = loadImage(t_rex_image_url);
// }

function setup() {
    let canvas = createCanvas(600, 500);
    canvas.parent("myContainer");
    tf.setBackend('cpu');
    slider = createSlider(1, 10, 1);
    slider.position(300, 570);
    for (let i = 0; i < TOTAL; i++) {
        dinosaurs[i] = new T_Rex();
    }
}

function draw() {
    for (let n = 0; n < slider.value(); n++) {
        if (counter % 50 === 0) {
            if (score % 50 === 0) {
                current_rock_speed += 1;
            }
            rocks.push(new Rock(current_rock_speed));
        }
        counter++;
        for (let i = rocks.length - 1; i >= 0; i--) {
            rocks[i].update();

            for (let j = dinosaurs.length - 1; j >= 0; j--) {
                if (rocks[i].hits(dinosaurs[j])) {
                    savedDinosaurs.push(dinosaurs.splice(j, 1)[0]);
                }
            }
            if (rocks[i].offscreen()) {
                rocks.splice(i, 1);
                score += 1;
            }

            if (rocks.length === 0) {
                rocks.push(new Rock(current_rock_speed));
            }

        }


        for (let t_rex of dinosaurs) {
            t_rex.think(rocks);
            t_rex.update();
        }

        if (dinosaurs.length === 0) {
            counter = 0;
            score = 0;
            nextGeneration();
            rocks = [];
        }
    }

    background(220);
    textSize(24);
    text('score:' + score, 10, 30);

    textSize(24);
    text('speed:' + current_rock_speed, 10, 60);

    for (let rock of rocks) {
        rock.show();
    }
    for (let t_rex of dinosaurs) {
        t_rex.show();
    }
}


// function setup() {
//     let canvas = createCanvas(600, 500);
//     canvas.parent("myContainer");
//     tf.setBackend('cpu');
//     // for (let i = 0; i < TOTAL; i++) {
//     //     dinosaurs[i] = new T_Rex();
//     // }
//     t_rex = new T_Rex();
// }
//
//
// function draw() {
//     if (frameCount % 50 == 0) {
//         rocks.push(new Rock());
//     }
//     background(220);
//
//     for (let rock of rocks){
//         rock.show();
//         rock.update();
//         if(rock.hits(t_rex)){
//             console.log("hit");
//         }
//     }
//     t_rex.show();
//     t_rex.update();
//
//     textSize(24);
//     text('score:' + score, 10, 30);
//
// }


function keyPressed() {
    if (key == ' ') {
        t_rex.jump();
        //console.log("SPACE");
    }
}
