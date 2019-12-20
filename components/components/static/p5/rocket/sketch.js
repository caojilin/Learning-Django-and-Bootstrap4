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

let rx = 0;
let ry = 0;
let rw = 0;
let rh = 0;

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

    button2 = createButton('increase barier length');
    button2.position(sidebar_w + 640, 350);
    button2.style('font-size', 18 + 'px');
    button2.mousePressed(increase_barrier);

    button3 = createButton('decrease barier length');
    button3.position(sidebar_w + 640, 400);
    button3.style('font-size', 18 + 'px');
    button3.mousePressed(decrease_barrier);

}

function increase_barrier(){
    rw += 100;
    rx -= 50
}

function decrease_barrier(){
    rx += 50
    rw -= 100;
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

    if (show_barrier) {
        rx = width/2-150;
        ry = 350;
        rw = 300;
        rh = 10;
    } else {
        rx = 0;
        ry = 0;
        rw = 0;
        rh = 0
    }
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
//    rectMode(CENTER);
    rect(rx, ry, rw, rh);
    fill(255, 100);
    ellipseMode(CENTER);
    ellipse(target.x, target.y, target_radius);
}
