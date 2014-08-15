var FridayGameJam = FridayGameJam || {};

FridayGameJam.GameObjects.Ball = function(state, texture, x, y, z, level) {

	Kiwi.GameObjects.Sprite.call(this, state, texture, x, y);

	// Register level
	this.level = level;

	// Init depth value to manage fake 3D
	this.z = z;

	this.radius = 23;
	this.velocity = { x: 0, y: 0, z: 0 };
	this.acceleration = { x: 0, y: 0 };
	this.frictionRestitution = { x: 1, y: 1, power: 2 };
	this.restitution = 1.0;	// Bounciness
}

Kiwi.extend( FridayGameJam.GameObjects.Ball, Kiwi.GameObjects.Sprite );


FridayGameJam.GameObjects.Ball.prototype.update = function( player, ai ) {
	// Main ball physics schedule
	// Requires knowledge of player and ai paddle positions

	// Acceleration and velocity
	this.velocity.x += this.acceleration.x;
	this.velocity.y += this.acceleration.y;
	// this.velocity.z stays the same
	this.x += this.velocity.x;
	this.y += this.velocity.y;
	this.z += this.velocity.z;

	// Test for edge collision
	this.collideEdges();

	// Test for paddle collision and victory conditions
}

FridayGameJam.GameObjects.Ball.prototype.collideEdges = function() {
	// 2D edge collision, very simple

	if( this.x <= this.level.gameArea.left + this.radius ) {
		this.velocity.x = Math.abs(this.velocity.x * this.restitution);
	}
	else if( this.level.gameArea.right - this.radius <= this.x ) {
		this.velocity.x = -Math.abs(this.velocity.x * this.restitution);
	}

	if( this.y <= this.level.gameArea.top + this.radius ) {
		this.velocity.y = Math.abs(this.velocity.y * this.restitution);
	}
	else if( this.level.gameArea.bottom - this.radius <= this.y ) {
		this.velocity.y = -Math.abs(this.velocity.y * this.restitution);
	}
}