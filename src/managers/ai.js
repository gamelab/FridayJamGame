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

FridayGameJam.Managers.AI.prototype.run = function() {
	// Follow state ball position
	this.aiPos.setTo( this.state.ball.x + this.state.ball.margin + this.state.ball.radius, this.state.ball.y + this.state.ball.margin + this.state.ball.radius );
}

FridayGameJam.Managers.AI.prototype.increaseDifficulty = function() {
	this.level++;
}

FridayGameJam.Managers.AI.prototype.restart = function() {
	this.lives = 3;
}


FridayGameJam.Managers.AI.prototype.addToStage = function() {
	// Set up a proper scale group
	this.scaleGroup = new Kiwi.Group(this.state);
	this.scaleGroup.addChild( this.paddle );
	var scaleFactor = this.state.level.gameDepth.front / this.state.level.gameDepth.back;
	this.scaleGroup.scale = scaleFactor;
	this.scaleGroup.x = (this.state.game.stage.width / 2) * (1 - scaleFactor);
  	this.scaleGroup.y = (this.state.game.stage.height / 2) * (1 - scaleFactor);
	this.state.addChild( this.scaleGroup );	
}