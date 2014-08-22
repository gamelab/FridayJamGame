var FridayGameJam = FridayGameJam || {};

FridayGameJam.Managers.Player = function(state) {

	this.state = state;
	this.game = this.state.game;
	this.lives = 5;

	this.paddle = new FridayGameJam.GameObjects.Paddle(this.state, this.state.textures['blue-paddle'], 0, 0);
	this.paddle.centerOnScreen();

	//Input
	this.startDrag();

}

FridayGameJam.Managers.Player.prototype.addToStage = function() {
	this.state.addChild( this.paddle );	
}

FridayGameJam.Managers.Player.prototype.startDrag = function() {
	this.paddle.follow( this.game.input.mouse );
	this.game.stage.container.style.cursor = 'none';
}

FridayGameJam.Managers.Player.prototype.stopFollowingMouse = function() {
	this.paddle.stopFollow( );
	this.game.stage.container.style.cursor = '';
}

FridayGameJam.Managers.Player.prototype.loseLife = function() {
	this.lives--;

	if(this.lives < 0) {
		this.state.playerGameover();
	}
}


FridayGameJam.Managers.Player.prototype.gainLife = function(amount) {
	var amount = amount || 1;
	this.lives += Math.abs(amount);
}
