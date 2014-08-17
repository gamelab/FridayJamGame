var FridayGameJam = FridayGameJam || {};

FridayGameJam.GameObjects.Paddle = function(state, texture, x, y) {

	Kiwi.GameObjects.Sprite.call(this, state, texture, x, y);

	this.velocity = new Kiwi.Geom.Point(0,0);
}

Kiwi.extend( FridayGameJam.GameObjects.Paddle, Kiwi.GameObjects.Sprite );

FridayGameJam.GameObjects.Paddle.prototype.centerOnScreen = function() {

	this.x = this.game.stage.width * 0.5 - this.box.bounds.width * 0.5;
	this.y = this.game.stage.height * 0.5 - this.box.bounds.height * 0.5;

}

FridayGameJam.GameObjects.Paddle.prototype.follow = function( point ) {

	this._following = true;
	this._followPoint = point;

}


FridayGameJam.GameObjects.Paddle.prototype.update = function() {

	Kiwi.GameObjects.Sprite.prototype.update.call(this);

	if(this._following) {
		// Cache last position
		var lastX = this.x;
		var lastY = this.y;
		// Compute new position
		this.x = this._followPoint.x - this.box.bounds.width * 0.5;
		this.y = this._followPoint.y - this.box.bounds.height * 0.5;
		// Compute velocity
		this.velocity.setTo( this.x - lastX, this.y - lastY );
	}

}
