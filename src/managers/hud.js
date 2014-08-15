var FridayGameJam = FridayGameJam || {};

FridayGameJam.Managers.HUD = function(state, ai, player) {

	this.state = state;
	this.game = this.state.game;
	this.ai = ai;
	this.player = player;

	this.score = 0;

	this.scoreText = new Kiwi.GameObjects.Textfield(this.state, 'Score: ' + this.score, 70, 70, '#09c', 14 );
	this.levelText = new Kiwi.GameObjects.Textfield(this.state, 'Level: ' + this.ai.level, this.game.stage.width - 70, 70, '#09c', 14 );

	this.levelText.textAlign = 'right';


}

FridayGameJam.Managers.HUD.prototype.addToStage = function() {

	this.state.addChild(this.scoreText);
	this.state.addChild(this.levelText);
	
}

FridayGameJam.Managers.HUD.prototype.update = function() {

	this.scoreText.text = 'SCORE: ' + this.score;
	this.levelText.text = 'LEVEL: ' + this.ai.level;


}