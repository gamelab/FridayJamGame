var FridayGameJam = FridayGameJam || {};

FridayGameJam.GameObjects.Live = function(state) {

	Kiwi.GameObjects.Sprite.call(this, state, state.textures['ball-hud'], 0, 0);
	this.death = false;
	this.alpha = 0;
}

Kiwi.extend( FridayGameJam.GameObjects.Live, Kiwi.GameObjects.Sprite );

FridayGameJam.GameObjects.Live.prototype.delete = function() {
	//Remove
	this.death = true;
}

FridayGameJam.GameObjects.Live.prototype.update = function() {

	if(this.live) {

	}

	if(this.death) {
		this.alpha -= 0.1;

		if(this.alpha <= 0) {
			this.exist = false;
		} 
	} else {
		this.alpha += 0.1;
	}


	Kiwi.GameObjects.Sprite.prototype.update.call(this);
}
