var FridayGameJam = FridayGameJam || {};

FridayGameJam.GameObjects.Ball = function(state, texture, x, y, z, level) {

	Kiwi.GameObjects.Sprite.call(this, state, texture, x, y);

	// Register level
	this.level = level;
	this.animation.add('pulse', [3,2,1,0], 0.1, false);

	// Init depth value to manage fake 3D
	this.z = z;

	this.radius = 23;
	this.velocity = { x: 0, y: 0, z: 0 };
	this.acceleration = { x: 0, y: 0 };
	this.accelerationRetention = 0.99;
	this.frictionRestitution = { x: 1, y: 1, power: 2 };
	this.restitution = 1.0;	// Bounciness
	this.curviness = 0.05;
}

Kiwi.extend( FridayGameJam.GameObjects.Ball, Kiwi.GameObjects.Sprite );


FridayGameJam.GameObjects.Ball.prototype.run = function( player1, player2 ) {
	// Main ball physics schedule
	// Requires knowledge of player and ai paddle positions

	// Acceleration and velocity
	this.velocity.x += this.acceleration.x * this.state.game.time.rate;
	this.velocity.y += this.acceleration.y * this.state.game.time.rate;
	// this.velocity.z stays the same
	this.x += this.velocity.x * this.state.game.time.rate;
	this.y += this.velocity.y * this.state.game.time.rate;
	this.z += this.velocity.z * this.state.game.time.rate;

	// Test for edge collision
	this.collideEdges();

	// Reduce curve
	this.acceleration.x *= this.accelerationRetention;
	this.acceleration.y *= this.accelerationRetention;

	// Test for paddle collision and victory conditions
	this.collidePlayers( player1, player2 );
}

FridayGameJam.GameObjects.Ball.prototype.collideEdges = function() {
	// 2D edge collision, very simple

	if( this.x <= this.level.gameArea.left ) {
		this.x = this.level.gameArea.left;
		this.velocity.x = Math.abs(this.velocity.x * this.restitution);
		this.animation.play('pulse', true);
	}
	else if( this.level.gameArea.right - this.radius * 2 <= this.x ) {
		this.x = this.level.gameArea.right - this.radius * 2;
		this.velocity.x = -Math.abs(this.velocity.x * this.restitution);
		this.animation.play('pulse', true);
	}

	if( this.y <= this.level.gameArea.top ) {
		this.y = this.level.gameArea.top;
		this.velocity.y = Math.abs(this.velocity.y * this.restitution);
		this.animation.play('pulse', true);
	}
	else if( this.level.gameArea.bottom - this.radius * 2 <= this.y ) {
		this.y = this.level.gameArea.bottom - this.radius * 2;
		this.velocity.y = -Math.abs(this.velocity.y * this.restitution);
		this.animation.play('pulse', true);
	}
}

FridayGameJam.GameObjects.Ball.prototype.collidePlayers = function(player1, player2) {
	// Function for Z-depth bouncing

	if( this.z <= this.level.gameDepth.front ) {
		if( this.box.rawBounds.intersects( player1.paddle.box.rawBounds ) ) {
			this.velocity.z = Math.abs( this.velocity.z * this.restitution );
			this.acceleration.x = player1.paddle.velocity.x * this.curviness;
			this.acceleration.y = player1.paddle.velocity.y * this.curviness;
			this.animation.play('pulse', true);
		}
		else {
			/*
			// Proper behaviour
			this.stop();
			console.log( "Nearside score!");
			*/
			// Showcase behaviour
			this.velocity.z = Math.abs( this.velocity.z * this.restitution );
			this.acceleration.x = player1.paddle.velocity.x * this.curviness;
			this.acceleration.y = player1.paddle.velocity.y * this.curviness;
		}
	}
	else if( this.level.gameDepth.back <= this.z ) {
		if( this.box.rawBounds.intersects( player2.paddle.box.rawBounds) ) {
			this.velocity.z = -Math.abs(this.velocity.z * this.restitution);
			this.acceleration.x = player2.paddle.velocity.x * this.curviness;
			this.acceleration.y = player2.paddle.velocity.y * this.curviness;
			this.animation.play('pulse', true);
		}
		else {
			/*
			// Proper behaviour
			this.stop();
			console.log("Farside score!");
			*/
			this.velocity.z = -Math.abs(this.velocity.z * this.restitution);
			this.acceleration.x = player2.paddle.velocity.x * this.curviness;
			this.acceleration.y = player2.paddle.velocity.y * this.curviness;
		}
	}
}

FridayGameJam.GameObjects.Ball.prototype.stop = function() {
	this.velocity.x = 0;
	this.velocity.y = 0;
	this.velocity.z = 0;
	this.acceleration.x = 0;
	this.acceleration.y = 0;
}