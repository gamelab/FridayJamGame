var FridayGameJam = FridayGameJam || {};

FridayGameJam.GameObjects.Level = function(state, texture, x, y) {

	Kiwi.GameObjects.Sprite.call(this, state, texture, x, y);

	this.gameArea = new Kiwi.Geom.Rectangle( 38, 50, 464, 310 );
}

Kiwi.extend( FridayGameJam.GameObjects.Level, Kiwi.GameObjects.Sprite );