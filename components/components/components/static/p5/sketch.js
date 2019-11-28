let unicorn;
let uImg;
let tImg;
let bImgTop;
let bImgNightTop;
let bImgBottom;
let font;
let trains = [];
let time = 3;
let speed = 0;
const maxSpeed = 0.2;
let trainSpeed = 0;
let game_over = false;
let score = 0;
let high_score = 0;
let topBgOffset = 0;
let bottomBgOffset = 0;
const thresholdScore = 500;
let nightTime = false;
let beep;
let gameOverAudio;
let pauseAudio;
let playAudio;
let choo_choo;
let isPaused = false;
let isMuted = false;
let starting = false;
let timeOutId;
const debugFlag = false;    // Use during development only.
let soundClassifier;


function preload() {
  font = loadFont(url1);
  uImg = loadImage(url2);
  tImg = loadImage(url3);

  beep = loadSound(url4);
  gameOverAudio = loadSound(url5);
  pauseAudio = loadSound(url6);
  playAudio = loadSound(url7);
  choo_choo = loadSound(url8);

  bImgTop = loadImage(url9);
  bImgBottom = loadImage(url10);
  bImgNightTop = loadImage(url11);

  const options = {
    probabilityThreshold: 0.95
  };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
}

function setup() {
  let myCanvas = createCanvas(800, 450);
  myCanvas.parent("myContainer");
  unicorn = new Unicorn();
  soundClassifier.classify(gotCommand);
  nextTrainCountdown();

  if (isMuted) {
    masterVolume(0);
  }
}

let a = '';
let b = '';
function gotCommand(error, results) {

  if (error) {
    a = 'none';
    b = 'none';
    console.error(error);
  } else {
    a = results[0].label;
    b = results[0].confidence;
    console.log(results[0].label, results[0].confidence);
    if (results[0].label == 'up') {
      unicorn.jump(beep);
    }
  }
}

function keyPressed() {
  if (keyCode == 27) {
    // ESCAPE Key: Pause

    if (!isPaused && !game_over && !starting) {
      noLoop();
      pauseAudio.play();
      clearAllTimeOuts(timeOutId + 1);
      isPaused = true;
    }

    else {
      continueGame();
    }
  }

  if (game_over)
    mousePressed();

  if (key == ' ' && isPaused) {
    continueGame();
    return;
  }

  if (key == 'm') {
    // 'M' Key: Mute SFX

    if (isMuted) {
      masterVolume(1);
    }
    else {
      masterVolume(0);
    }

    isMuted = !isMuted;
  }

  if (key == ' ' || keyCode == 38) {
    // 'SPACE' / 'UP ARROW KEY': Jump
    unicorn.jump(beep);
  }
}

function mousePressed() {
  if (game_over) {
    trains = [];
    time = 3;
    gameStartCountdown();
    game_over = false;

    if (!starting)
      setTimeout(() => {
        nextTrainCountdown();
        score = 0;
        loop();
        clearAllTimeOuts();
      }, 2000);
  }

  else if (isPaused) {
    continueGame();
  }

  else {
    unicorn.jump(beep);
  }
}

function setNextTrainTimer() {
  time = floor(random(map(speed, 0, maxSpeed, 0.25, 0.5), map(speed, 0, maxSpeed, 2.5, 4)));
  // console.log(trains)
}

function nextTrainCountdown() {
  if (!game_over && !isPaused) {
    timeOutId = setTimeout(() => {
      trains.push(new Train());
      setNextTrainTimer();
      nextTrainCountdown();
    }, time * 1000);
  }
}

function clearAllTimeOuts(timeout_id) {
  if (timeout_id == null)
    timeout_id = timeOutId;

  while (timeout_id--) {
    clearTimeout(timeout_id);
  }
}

function continueGame() {
  gameStartCountdown();

  if (!starting)
    setTimeout(() => {
      isPaused = false;
      playAudio.play();
      nextTrainCountdown();
      loop();
    }, 2000);
}

function gameStartCountdown() {
  if (!starting && (game_over || isPaused)) {
    w = width / 2.38;

    noFill();
    stroke(255);
    textSize(35);
    text("1    2    3", w, height / 1.3);
    noStroke();

    // Required to allow atleast the first occurance of code relying on `starting` to work
    setTimeout(() => {
      starting = true;
    }, 10);

    setTimeout(() => {
      stroke(255);
      fill(255);
      textSize(35);
      text("1", w, height / 1.3);
    }, 500);

    setTimeout(() => {
      stroke(0, 255, 211);
      fill(0, 255, 211);
      textSize(35);
      text("1    2", w, height / 1.3);
    }, 1000);

    setTimeout(() => {
      stroke(245, 220, 35);
      fill(245, 220, 35);
      textSize(35);
      text("1    2    3", w, height / 1.3);
    }, 1500);

    setTimeout(() => starting = false, 2000);
  }
}

function draw() {
  score = score + (0.5 * speed) + 0.1;
  speed += (score.toFixed(1) % 10 == 0) ? 0.001 : 0;
  speed = constrain(speed, 0, maxSpeed);

  topBgOffset = (topBgOffset + map(speed, 0, maxSpeed, 0.2, 1.0)) % width;
  bottomBgOffset = (bottomBgOffset + map(speed, 0, maxSpeed, 5, 10)) % width;

  image(bImgNightTop, -topBgOffset, 0);
  image(bImgNightTop, -topBgOffset + width, 0);

  if (score % (thresholdScore * 2) >= 0 && score % (thresholdScore * 2) <= thresholdScore) {
    nightTime = false;
    // console.log("DAY-TIME");
  }

  else if (score % (thresholdScore * 2) > thresholdScore && score % (thresholdScore * 2) <= thresholdScore * 2) {
    nightTime = true;
    // console.log("NIGHT-TIME");
  }

  if (parseInt(score) % thresholdScore >= 0 && (parseInt(score) % thresholdScore).toFixed(1) <= 5.1) {
    let tintVal;

    if (!nightTime) {
      tintVal = constrain(map((score % thresholdScore).toFixed(1), 0, 5.1, 0, 255), 0, 255);
    }

    else {
      tintVal = constrain(map((score % thresholdScore).toFixed(1), 0, 5.1, 255, 0), 0, 255);
    }

    tint(255, tintVal);
  }

  if (!nightTime || (parseInt(score) % thresholdScore).toFixed(1) <= 5.1) {
    image(bImgTop, -topBgOffset, 0);
    image(bImgTop, -topBgOffset + width, 0);
  }

  noTint();

  image(bImgBottom, -bottomBgOffset, 307);
  image(bImgBottom, -bottomBgOffset + width, 307);

  // if (parseInt(score) % 100 == 0)
  //   choo_choo.play();

  for (let t of trains) {
    trainSpeed = map(speed, 0, maxSpeed, 12, 20);

    t.move(trainSpeed);
    t.show();

    if (unicorn.hits(t)) {
      gameOverAudio.play();
      isPaused = false;
      console.log('game over');
      game_over = true;
      background(0, 100);

      textFont("default");
      fill(245, 220, 35);
      stroke(255, 158, 77);
      textSize(25);
      text("¯\\_(ツ)_/¯", width / 2.18, height / 2.5);
      textFont(font);
      // textFont("default");

      noFill();
      stroke(255);
      textSize(32);
      text("GAME OVER!", width / 2.48, height / 2);

      fill(255);
      noStroke();
      textSize(18);
      text("Tap the screen or Press any key to restart...", width / 3.9, height / 1.6);

      if (score > high_score) {
        high_score = parseInt(score);

        fill(0, 255, 211);
        textSize(25);
        text("New Highscore!!", width / 2.53, 60);
      }

      speed = 0;
      noLoop();
    }

    if (t.offscreen()) {
      trains.splice(0, 1);  // Remove first occurance; (Most likely offscreen)
    }
  }

  textFont(font);
  // textFont("default");

  noStroke();
  fill(198, 105, 235);
  stroke(178, 56, 227);

  if (game_over || nightTime) {
    fill(245, 220, 35);
    stroke(255, 158, 77);
  }

  if (!game_over) {
    textSize(18);
    text(`ESC: ${(!isPaused) ? "Pause" : "Continue"}`, 20, 25);
    text(`M:    ${(!isMuted) ? "Mute SFX" : "Unmute SFX"}`, 20, 50);
  }

  textSize(18);
  text("Score", width - 100, 25);
  text(parseInt(score), width - 100, 50);

  text("Hi Score", width - 200, 25);
  text(high_score, width - 200, 50);

  text("prob", width - 300, 25);
  text(b, width - 300, 50);

  text("Command", width - 400, 25);
  text(a, width - 400, 50);


  if (debugFlag) {
    noStroke();
    textSize(15);
    text("DEBUG", width / 2.08, 20);

    textSize(15);
    text("Speed = " + speed, 20, 85);

    textSize(15);
    text("Train Speed = " + trainSpeed, 20, 100);

    textSize(15);
    text("Top BG Offset = " + topBgOffset.toFixed(10).toString().padStart(14, '0'), 20, 115);

    textSize(15);
    text("Bottom BG Offset = " + bottomBgOffset.toFixed(10).toString().padStart(14, '0'), 20, 130);

    // Manual Change Reqd.
    textSize(15);
    text(`Top BG Velocity = ${map(speed, 0, maxSpeed, 0.2, 1.0)} per Frame`, 20, 145);

    // Manual Change Reqd.
    textSize(15);
    text(`Bottom BG Velocity = ${map(speed, 0, maxSpeed, 5, 10)} per Frame`, 20, 160);

    // Manual Change Reqd.
    textSize(15);
    text(`Min Time Gap = ${map(speed, 0, maxSpeed, 0.25, 0.5)} secs`, 20, 175);

    // Manual Change Reqd.
    textSize(15);
    text(`Max Time Gap = ${map(speed, 0, maxSpeed, 2.5, 4)} secs`, 20, 190);
  }

  if (isPaused) {
    background(0, 100);

    fill(0, 255, 211);
    stroke(0, 255, 211);
    textSize(25);
    strokeWeight(5);
    text("|  |", width / 2.04, height / 2.7);
    strokeWeight(1);

    noFill();
    stroke(255);
    textSize(32);
    text("PAUSED!", width / 2.3, height / 2);

    fill(255);
    noStroke();
    textSize(18);
    text("Tap the screen or Press 'ESC'/'SPACE' to continue...", width / 4.5, height / 1.6);
  }

  unicorn.show();
  unicorn.move();
}
