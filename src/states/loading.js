
var FridayGameJam = FridayGameJam || {};

FridayGameJam.Loading = new KiwiLoadingScreen('Loading', 'Intro', 'assets/img/loading/');

FridayGameJam.Loading.preload = function () {
    
    KiwiLoadingScreen.prototype.preload.call(this);

    this.addImage('background', './assets/img/game/bg.png');
    this.addImage('depth-rect', './assets/img/game/ball-depth-rectangle.png');

    //In Game
    this.addSpriteSheet('ball', './assets/img/game/ball.png', 124, 125);
    this.addSpriteSheet('blue-paddle', './assets/img/game/light-blue-paddle.png', 92, 62);
    this.addSpriteSheet('red-paddle', './assets/img/game/orange-paddle.png', 92, 62);
    this.addSpriteSheet('ball-hud', './assets/img/game/balls-hud.png', 8, 8);

    //Start Screen
    this.addImage('title', './assets/img/game-title.png');
    this.addImage('gameover', './assets/img/game-over.png');
    this.addImage('html-remake', './assets/img/html-remake.png');


    //Button
    this.addImage('start-game-button', './assets/img/buttons/start-game-button.png');
    this.addImage('hi-score-button', './assets/img/buttons/hi-score-button.png');
    this.addImage('try-again-button', './assets/img/buttons/try-again.png');

};
