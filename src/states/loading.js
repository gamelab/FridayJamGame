
var FridayGameJam = FridayGameJam || {};

FridayGameJam.Loading = new KiwiLoadingScreen('Loading', 'Intro', 'assets/img/loading/');

FridayGameJam.Loading.preload = function () {
    
    KiwiLoadingScreen.prototype.preload.call(this);

    this.addImage('background', './assets/img/game/bg.png');
    this.addImage('depth-rect', './assets/img/game/ball-depth-rectangle.png');

    this.addSpriteSheet('ball', './assets/img/game/ball.png', 46, 46);
    this.addSpriteSheet('blue-paddle', './assets/img/game/blue-paddle.png', 92, 62);
    this.addSpriteSheet('red-paddle', './assets/img/game/red-paddle.png', 92, 62);

    this.addSpriteSheet('ball-hud', './assets/img/game/balls-hud.png', 8, 8);

};
