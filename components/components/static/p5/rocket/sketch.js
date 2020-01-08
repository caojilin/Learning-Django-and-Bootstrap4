let population;
let population_size= 25;
let target;
let target_radius = 40;
let Count = 0;
let lifeP;
let lifeSpan = 400;
let maxforce = 0.3;
let generationP;
let generationCount = 0;
let successful_hit = 0;
let successP;
let deathP;


let show_barrier = false;

let rx = 0;
let ry = 0;
let rw = 0;
let rh = 0;

let button;
let sidebar_w = 241;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    population = new Population(population_size);
    target = createVector(width / 2, 50);

    html_height_positions = [150, 200, 250, 300, 350, 400, 450]

    lifeP = createP();
    lifeP.parent('sketch-holder');
    lifeP.position(sidebar_w + 650, html_height_positions[0]);
    generationP = createP();
    generationP.position(sidebar_w + 650, html_height_positions[1]);
    successP = createP();
    successP.position(sidebar_w + 650, html_height_positions[2]);
    deathP = createP();
    deathP.position(sidebar_w + 650, html_height_positions[3]);

    button = createButton('add barrier');
    button.position(sidebar_w + 650, html_height_positions[4]);
    button.style('font-size', 18 + 'px');
    button.mousePressed(remove_barrier);

    input_P = createP("popsize: ");
    input_P.position(sidebar_w + 650, html_height_positions[5])
    input_P.style('font-size', 18 + 'px');
    inp = createInput(population_size.toString());
    inp.position(sidebar_w + 720, html_height_positions[5]);
    inp.size(50, 30);
    button4 = createButton('submit');
    button4.position(sidebar_w + 780, html_height_positions[5]);
    button4.mousePressed(change_popsize);
}

function change_popsize() {
    new_size = parseInt(inp.value());
    population = new Population(new_size);
    Count = 0;
    generationCount = 0;
}

function increase_barrier() {
    rx -= 25;
    rw += 50;
}


function change_circle_size() {

}

function remove_barrier() {
    if (!show_barrier) {
        button.html('remove barrier');
    } else {
        button.html('add barrier');
    }
    show_barrier = !show_barrier;

    if (show_barrier) {
        rx = width / 2 - 200;
        ry = 400;
        rw = 400;
        rh = 10;
    } else {
        rx = 0;
        ry = 0;
        rw = 0;
        rh = 0;
    }
}

function draw() {
    background(0);
    population.run();
    lifeP.html("lifespan: " + Count);
    generationP.html("generations: " + generationCount);
    successful_hit = population.success();
    successP.html("successfully hit target: " + successful_hit);
    deathP.html("death rate: " + (1 - successful_hit / population.popsize).toFixed(2));


    Count += 1;
    if (Count === lifeSpan) {
        population.evaluate();
        population.selection();
        Count = 0;
        generationCount += 1;
    }

    fill(255);
    rect(rx, ry, rw, rh);
    fill(255, 100);
    ellipseMode(CENTER);
    ellipse(target.x, target.y, target_radius);
}
