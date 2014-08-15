var FridayGameJam = FridayGameJam || {};

FridayGameJam.Managers.Player = function(state) {

	this.state = state;
	this.game = this.state.game;
	this.lives = 5;

	this.paddle = new FridayGameJam.GameObjects.Paddle(this.state, this.state.textures['blue-paddle'], 0, 0);
	this.paddle.centerOnScreen();

	//Input
	this.startDrag();
	this.hideCursor();

}

FridayGameJam.Managers.Player.prototype.addToStage = function() {
	this.state.addChild( this.paddle );	
}

FridayGameJam.Managers.Player.prototype.startDrag = function() {
	this.paddle.follow( this.game.input.mouse );
}

FridayGameJam.Managers.Player.prototype.hideCursor = function() {
	this.game.stage.container.style.cursor = 'none';
}
