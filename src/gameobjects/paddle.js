var FridayGameJam = FridayGameJam || {};

FridayGameJam.GameObjects.Paddle = function(state, texture, x, y) {

	Kiwi.GameObjects.Sprite.call(this, state, texture, x, y);
}

Kiwi.extend( FridayGameJam.GameObjects.Paddle, Kiwi.GameObjects.Sprite );