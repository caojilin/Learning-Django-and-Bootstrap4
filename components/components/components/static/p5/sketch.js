// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/147-chrome-dinosaur.html
// https://youtu.be/l0HoJHc-63Q

// Google Chrome Dinosaur Game (Unicorn, run!)
// https://editor.p5js.org/codingtrain/sketches/v3thq2uhk

let unicorn;
let uImg;
let tImg;
let bImg;
let trains = [];
let soundClassifier;

function preload() {
  const options = {
    probabilityThreshold: 0.95
  };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
  uImg = loadImage(url1);
  tImg = loadImage(url2);
  bImg = loadImage(url3);
}

function mousePressed() {
  trains.push(new Train());
}

function setup() {
var loc = window.location.pathname;
var loc = window.location.pathname;

  console.log(loc);
  let myCanvas = createCanvas(800, 450);
  myCanvas.parent('myContainer');
  unicorn = new Unicorn();
  soundClassifier.classify(gotCommand);
}

function gotCommand(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results[0].label, results[0].confidence);
  if (results[0].label == 'up') {
    unicorn.jump();
  }
}

let gameover = false;

function keyPressed() {
  if (key == ' ') {
    unicorn.jump();
  }
  if (gameover){
    if(keyIsPressed === true){
        trains = [];
        gameover = false;
        loop();
    }
  }
}

function draw() {
  
  if (random(1) < 0.005) {
    trains.push(new Train());
  }
  
  background(bImg);
  for (let t of trains) {
    t.move();
    t.show();
    if (unicorn.hits(t)) {
      console.log('game over');
      textSize(32);
      fill(0, 102, 153);
      textAlign(CENTER);
      text("game over, press any key to restart", width/2, height/2);
      gameover = true;
      noLoop();
    }
  }

  unicorn.show();
  unicorn.move();
}