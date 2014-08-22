var FridayGameJam = FridayGameJam || {};

FridayGameJam.GameObjects.Level = function(state, texture, x, y) {

	Kiwi.GameObjects.Sprite.call(this, state, texture, x, y);

	this.gameArea = new Kiwi.Geom.Rectangle( 38, 50, 464, 310 );

	this.gameDepth = { front: 100, back: 400 };

	// Glow function
	this.glow = 0;
	this.flicker = 0;
}

Kiwi.extend( FridayGameJam.GameObjects.Level, Kiwi.GameObjects.Sprite );


FridayGameJam.GameObjects.Level.prototype.run = function() {
	// Decay flicker
	this.flicker *= 0.90;
	if(this.flicker < 0) {
		this.flicker = 0;
	}
	// Composite flicker and pulse
	var pulse = Math.sin(this.state.game.idealFrame * 0.05);
	var flicker = this.flicker * Math.sin(this.state.game.idealFrame);
	this.glow = (pulse + flicker) * 0.25 + 0.5;
}