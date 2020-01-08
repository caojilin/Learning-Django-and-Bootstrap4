let game;
let gameover = false;
let result;

function setup() {
    var canvas = createCanvas(390, 390);
    canvas.parent('sketch-holder');
    game = new Game();
}

function draw() {
    select('#player1').html("player1:"+game.player1);
    select('#player2').html("player2:"+game.player2);
    select('#moves').html("moves:" + game.moves);
    select('#result').html("result:");
    background(255);
    game.show();

    result = game.check_win();
    if (result != null) {
        gameover = true;
        if (result == 'tie') {
            select('#result').html("result: tie");
        } else {
            select('#result').html("result:"+result+" is the winner");
        }
        noLoop();
    }
}

function newGame() {
    game.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    game.moves = 0;
    game.currentPlayer = game.player1;
}

function mouseClicked() {
    game.index = game.get_current_player_index();
    if (gameover){
        newGame();
        select('#result').html("");
        gameover = false;
        loop();
        result = null;
    }
}