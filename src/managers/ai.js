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

	if(this.state.ball.inPlay) {
		var dx = (this.state.ball.x + this.state.ball.margin + this.state.ball.radius) - (this.paddle.x + this.paddle.width / 2);
		var dy = (this.state.ball.y + this.state.ball.margin + this.state.ball.radius) - (this.paddle.y + this.paddle.height / 2);
		var vectorLength = Math.sqrt(dx * dx + dy * dy) / (1 + this.level * 0.3);
		dx /= vectorLength;
		dy /= vectorLength;
		this.aiPos.setTo( this.aiPos.x + dx, this.aiPos.y + dy);
	}
}

FridayGameJam.Managers.AI.prototype.increaseDifficulty = function() {
	this.level++;
}

FridayGameJam.Managers.AI.prototype.restart = function() {
	this.lives = 3;
}

FridayGameJam.Managers.AI.prototype.loseLife = function() {
	this.lives--;

	if(this.lives < 0) {
		this.increaseDifficulty();
		this.restart();
	}
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