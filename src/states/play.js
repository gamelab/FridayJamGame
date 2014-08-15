var FridayGameJam = FridayGameJam || {};

FridayGameJam.Play = new Kiwi.State('Play');


FridayGameJam.Play.create = function() {

  	this.player = new FridayGameJam.Managers.Player(this);
  	this.ai = new FridayGameJam.Managers.AI(this, 0);
 	this.hud = new FridayGameJam.Managers.HUD(this, this.ai, this.player);


  	this.player.addToStage();
  	this.ai.addToStage();
  	this.hud.addToStage();
}



FridayGameJam.Play.update = function () { 

  //Super method update loop
  Kiwi.State.prototype.update.call( this );

  this.hud.update();

}


FridayGameJam.Play.shutDown = function() {
	this.game.stage.container.style.cursor = '';
}

