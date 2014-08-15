var FridayGameJam = FridayGameJam || {};

FridayGameJam.Play = new Kiwi.State('Play');


FridayGameJam.Play.create = function() {

  this.player = new FridayGameJam.Managers.Player(this);

  this.ai = new FridayGameJam.Managers.AI(this, 0);


}



FridayGameJam.Play.update = function () { 

  //Super method update loop
  Kiwi.State.prototype.update.call( this );


}


