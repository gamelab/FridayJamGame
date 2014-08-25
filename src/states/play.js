var FridayGameJam = FridayGameJam || {};

FridayGameJam.Play = new Kiwi.State('Play');


FridayGameJam.Play.create = function() {

  this.player = new FridayGameJam.Managers.Player(this);
  this.ai = new FridayGameJam.Managers.AI(this, 1);
  this.hud = new FridayGameJam.Managers.HUD(this, this.ai, this.player);

  // Background
  this.level = new FridayGameJam.GameObjects.Level( this, this.textures.background, 0,0 );
  this.addChild( this.level );
  // Create pulsar field
  this.game.renderer.addSharedRendererClone( "TextureAtlasRenderer", "AdditiveTAR" );
  this.additiveRenderer = this.game.renderer.requestSharedRenderer("AdditiveTAR");
  this.additiveRenderer.blendMode.setMode("ADD");
  this.levelPulse = new Kiwi.GameObjects.Sprite( this, this.textures.background, 0,0 );
  this.levelPulse.glRenderer = this.additiveRenderer;
  this.addChild(this.levelPulse);

  // Ball and perspective
  this.ball = new FridayGameJam.GameObjects.Ball( this, this.textures.ball, this.game.stage.width / 2 - 23, this.game.stage.height / 2 - 23, this.level.gameDepth.front + (this.level.gameDepth.back - this.level.gameDepth.front) / 2, this.level );



  //GameOver Man, Gameover
  this.gameoverTitle = new Kiwi.GameObjects.StaticImage(this, this.textures['gameover'], 0, 2);
  this.gameoverTitle.x = this.game.stage.width * 0.5 - this.gameoverTitle.width * 0.6;

  this.tryAgainButton = new Kiwi.GameObjects.Sprite(this, this.textures['try-again-button'], 0, 10);
  this.tryAgainButton.x = this.game.stage.width * 0.5 - this.tryAgainButton.width * 0.5;
  this.tryAgainButton.y = 265;
  this.tryAgainButton.scale = 0.7;

  // Neon effects
  this.gameoverTitleNeon = new Kiwi.GameObjects.StaticImage(this, this.textures['gameover'], 0, 2);
  this.gameoverTitleNeon.x = this.gameoverTitle.x;
  this.gameoverTitleNeon.glRenderer = this.additiveRenderer;

  this.tryAgainButtonNeon = new Kiwi.GameObjects.Sprite(this, this.textures['try-again-button'], 0, 10);
  this.tryAgainButtonNeon.x = this.tryAgainButton.x;
  this.tryAgainButtonNeon.y = this.tryAgainButton.y;
  this.tryAgainButtonNeon.scale = 0.7;
  this.tryAgainButtonNeon.glRenderer = this.additiveRenderer;




  this.ai.addToStage();
  this.ball.addProps( this ); // The ball comes with certain associated props; this registers them
  this.player.addToStage();
  this.hud.addToStage();
}



FridayGameJam.Play.playerGameover = function() {

  //Stop the player
  this.player.stopFollowingMouse();

  // Stop the ball
  this.ball.stop();

  this.addChild( this.gameoverTitle );
  this.addChild(this.gameoverTitleNeon);
  this.addChild(this.tryAgainButton);
  this.addChild(this.tryAgainButtonNeon);


  this.tryAgainButton.input.onUp.add( function() {
    this.game.states.switchState('Intro');
  }, this );

}


FridayGameJam.Play.update = function () { 

  //Super method update loop
  Kiwi.State.prototype.update.call( this );

  this.hud.update();

  // AI controls
  this.ai.run();

  // Ball physics
  //this.ball.acceleration.x = 0.1 * Math.sin(this.game.idealFrame * 0.01);	// Test delta vee
  this.ball.run( this.player, this.ai );

  // Cosmetic animation
  this.level.run();
  this.levelPulse.alpha = this.level.glow;

  /*
  this.gameoverTitleNeon.alpha = 0.1 * ( Math.sin(this.game.idealFrame * 0.15) + 0.5 * Math.sin(this.game.idealFrame * 0.75) ) + 0.25;
  this.tryAgainButtonNeon.alpha = 0.25 * ( Math.sin(this.game.idealFrame * 0.13) + 0.5 * Math.sin(this.game.idealFrame * 0.72) ) + 0.5;
  */
  this.gameoverTitleNeon.alpha = 1 - this.levelPulse.alpha;
  this.tryAgainButtonNeon.alpha = 1 - this.levelPulse.alpha;
}


FridayGameJam.Play.shutDown = function() {
	this.game.stage.container.style.cursor = '';

  this.ball.shutDown();
}

