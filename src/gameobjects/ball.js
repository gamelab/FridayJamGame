var FridayGameJam = FridayGameJam || {};

FridayGameJam.GameObjects.Ball = function(state, texture, x, y) {

	Kiwi.GameObjects.Sprite.call(this, state, texture, x, y);


}

Kiwi.extend( FridayGameJam.GameObjects.Ball, Kiwi.GameObjects.Sprite );