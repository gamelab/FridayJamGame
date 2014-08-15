var FridayGameJam = FridayGameJam || {};

FridayGameJam.Intro = new Kiwi.State('Intro');



FridayGameJam.Intro.create = function () {
	
	//Black Background    
	this.game.stage.color = '000000';
	this.game.stage.resize( this.game.stage.width, this.game.stage.height ); //HACK

	//Background
	this.background = new Kiwi.GameObjects.StaticImage(this, this.textures['background'], 0, 0);
	this.addChild(this.background);

	//GameTitle
	this.gameTitle = new Kiwi.GameObjects.Textfield(this, 'Absolution velocity'.toUpperCase(), this.game.stage.width * 0.5, 80, '#fff', 40, 'bold');
	this.gameTitle.textAlign = 'center';
	this.addChild(this.gameTitle);

	//Buttons
	this.button = new Kiwi.GameObjects.Sprite(this, this.textures['start-game-button'], 0, 0, true);
	this.button.x = this.game.stage.width * 0.5 - this.button.width * 0.5;
	this.button.y = this.game.stage.height * 0.5;
	this.addChild(this.button);


	this.button.input.onUp.add( this.startGame, this );

}

FridayGameJam.Intro.startGame = function() {

	this.game.stage.container.style.cursor = 'pointer';
	this.game.states.switchState('Play', null, null, { level: 0 } );

}