var FridayGameJam = FridayGameJam || {};

FridayGameJam.Intro = new Kiwi.State('Intro');



FridayGameJam.Intro.create = function () {
	
	//Black Background    
	this.game.stage.color = '000000';
	this.game.stage.resize( this.game.stage.width, this.game.stage.height ); //HACK

	//Background
	this.level = new FridayGameJam.GameObjects.Level( this, this.textures.background, 0,0 );
    this.addChild( this.level );
	// Create pulsar field
    this.game.renderer.addSharedRendererClone( "TextureAtlasRenderer", "AdditiveTAR" );
    this.additiveRenderer = this.game.renderer.requestSharedRenderer("AdditiveTAR");
    this.additiveRenderer.blendMode.setMode("ADD");
    this.levelPulse = new Kiwi.GameObjects.Sprite( this, this.textures.background, 0,0 );
    this.levelPulse.glRenderer = this.additiveRenderer;
    this.addChild(this.levelPulse);

	//HTML Remake
	this.remake = new Kiwi.GameObjects.StaticImage(this, this.textures['html-remake'], 0, 0);
	this.remake.x = this.game.stage.width * 0.5 - this.remake.width * 0.5;
	this.remake.y = this.game.stage.height - this.remake.height - 10;
	this.addChild(this.remake);

	//GameTitle
	this.gameTitle = new Kiwi.GameObjects.StaticImage(this, this.textures['title'], 0, 0);
	this.gameTitle.x = (this.game.stage.width - this.gameTitle.width) * 0.5;
	this.addChild(this.gameTitle);
	// Title neon
	this.gameTitleNeon = new Kiwi.GameObjects.StaticImage(this, this.textures['title'], 0, 0);
	this.gameTitleNeon.x = this.gameTitle.x;
	this.gameTitleNeon.glRenderer = this.additiveRenderer;
	this.addChild(this.gameTitleNeon);


	//Buttons
	// Start button
	this.startButton = new Kiwi.GameObjects.Sprite(this, this.textures['start-game-button'], 0, 10);
	this.startButton.x = this.game.stage.width * 0.5 - this.startButton.width * 0.5;
	this.startButton.y = 268;
	this.startButton.scale = 0.7;
	this.addChild(this.startButton);
	// Start button neon
	this.startButtonNeon = new Kiwi.GameObjects.Sprite(this, this.textures['start-game-button'], 0, 10);
	this.startButtonNeon.x = this.startButton.x;
	this.startButtonNeon.y = this.startButton.y;
	this.startButtonNeon.scale = 0.7;
	this.startButtonNeon.glRenderer = this.additiveRenderer;
	this.addChild(this.startButtonNeon);
	/*
	this.highButton = new Kiwi.GameObjects.Sprite(this, this.textures['hi-score-button'], 0, 10);
	this.highButton.x = this.game.stage.width * 0.5 - this.highButton.width * 0.5;
	this.highButton.y = 297;
	this.addChild(this.highButton);
	*/

	this.startButton.input.onUp.add( this.startGame, this );
	//this.highButton.input.onUp.add( this.hiScores, this );

}

FridayGameJam.Intro.update = function() {
	Kiwi.State.prototype.update.call( this );

	// Glows
	this.level.run();
    this.levelPulse.alpha = this.level.glow;

    /*
    this.gameTitleNeon.alpha = 0.1 * ( Math.sin(this.game.idealFrame * 0.15) + 0.5 * Math.sin(this.game.idealFrame * 0.75) ) + 0.25;
    this.startButtonNeon.alpha = 0.25 * ( Math.sin(this.game.idealFrame * 0.13) + 0.5 * Math.sin(this.game.idealFrame * 0.72) ) + 0.5;
    */
    this.gameTitleNeon.alpha = 1 - this.levelPulse.alpha;
    this.startButtonNeon.alpha = 1 - this.levelPulse.alpha;
}

FridayGameJam.Intro.startGame = function() {

	this.game.stage.container.style.cursor = 'pointer';
	this.game.states.switchState('Play', null, null, { level: 0 } );

}

FridayGameJam.Intro.hiScores = function() {

	this.game.stage.container.style.cursor = 'pointer';

}