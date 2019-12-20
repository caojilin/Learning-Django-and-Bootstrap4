let population;
let target;
let target_radius = 50;
let frameCount = 0;
let lifeP;
let lifeSpan = 400;
let maxforce = 0.2;
let generationP;
let generationCount = 0;
let successful_hit = 0;
let successP;
let deathP;

let show_barrier = false;

let rx;
let ry;
let rw;
let rh;

let button;
let sidebar_w = 241;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    population = new Population();
    target = createVector(width/2, 50);
    lifeP = createP();
    lifeP.position(sidebar_w + 650, 100);
    generationP = createP();
    generationP.position(sidebar_w + 650, 150);
    successP = createP();
    successP.position(sidebar_w + 650, 200);
    deathP = createP();
    deathP.position(sidebar_w + 650, 250);

    button = createButton('add barrier');
    button.position(sidebar_w + 640, 300);
    button.style('font-size', 18 + 'px');
    button.mousePressed(remove_barrier);

}

function change_circle_size() {

}

function remove_barrier() {
    if(!show_barrier){
        button.html('remove barrier');
    }else{
        button.html('add barrier');
    }
    show_barrier = !show_barrier;
}

function draw() {
    background(0);
    population.run();
    lifeP.html("lifespan: " + frameCount);
    generationP.html("generations: " + generationCount);
    successful_hit = population.success();
    successP.html("successfully hit target: " + successful_hit);
    deathP.html("death rate: " + (1 - successful_hit / population.popsize).toFixed(2));

    frameCount += 1;
    if (frameCount === lifeSpan) {
        population.evaluate();
        population.selection();
        frameCount = 0;
        generationCount += 1;
    }

    fill(255);
    if (show_barrier) {
        rx = 150;
        ry = 350;
        rw = 300;
        rh = 10;
    } else {
        rx = 0;
        ry = 0;
        rw = 0;
        rh = 0
    }
    rect(rx, ry, rw, rh);
    fill(255, 100);
    ellipseMode(CENTER);
    ellipse(target.x, target.y, target_radius);
}
