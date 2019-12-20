let population;
let target;
let frameCount = 0;
let lifeP;
let lifeSpan = 500;
let maxforce = 0.2;
let generationP;
let generationCount = 0
let successful_hit = 0;
let successP;
let deathCount = 0;
let deathP;

let rx = 150;
let ry = 350;
let rw = 300;
let rh = 10;

let sidebar_w = 241;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    population = new Population();
    target = createVector(width / 2, 50);
    lifeP = createP();
    lifeP.position(sidebar_w + 650, 100);
    generationP = createP();
    generationP.position(sidebar_w + 650, 150);
    successP = createP();
    successP.position(sidebar_w + 650, 200);
    deathP = createP();
    deathP.position(sidebar_w + 650, 250);

}

function draw() {
    background(0);
    population.run();
    lifeP.html("lifespan: " + frameCount);
    generationP.html("generations: " + generationCount);
    successP.html("successfully hit target: " + successful_hit);
    deathP.html("death rate: " + (1 - successful_hit / population.popsize));

    frameCount += 1;
    if (frameCount === lifeSpan) {
        population.evaluate();
        population.selection();
        frameCount = 0;
        successful_hit = 0;
        generationCount += 1;
    }

    fill(255);
    rect(rx, ry, rw, rh);
    ellipse(target.x, target.y, 16);
}
