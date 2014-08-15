var FridayGameJam = FridayGameJam || {};

FridayGameJam.Managers.AI = function(state, level) {

	this.state = state;
	this.game = this.state.game;

	this.level = level;
	this.restart();

	this.aiPos = new Kiwi.Geom.Point(this.game.stage.width / 2, this.game.stage.height / 2);

	this.paddle = new FridayGameJam.GameObjects.Paddle(this.state, this.state.textures['red-paddle'], 0, 0);
	this.paddle.centerOnScreen();

	this.paddle.follow( this.aiPos );

}

FridayGameJam.Managers.AI.prototype.increaseDifficulty = function() {
	this.level++;
}

FridayGameJam.Managers.AI.prototype.restart = function() {
	this.lives = 3;
}


FridayGameJam.Managers.AI.prototype.addToStage = function() {
	this.state.addChild( this.paddle );	
}