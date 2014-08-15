var FridayGameJam = FridayGameJam || {};

FridayGameJam.Managers.HUD = function(state, ai, player) {

	this.state = state;
	this.game = this.state.game;
	this.ai = ai;
	this.player = player;

	this.score = 0;

	this.scoreText = new Kiwi.GameObjects.Textfield(this.state, 'Score: ' + this.score, 80, 60, '#09c', 14, 'bold' );
	this.levelText = new Kiwi.GameObjects.Textfield(this.state, 'Level: ' + this.ai.level, this.game.stage.width - 80, 60, '#09c', 14, 'bold' );

	this.levelText.textAlign = 'right';

	this.playerLiveBalls = [];
	this.aiLiveBalls = [];

	this.playerBallsGroup = new Kiwi.Group( this.state );
	this.playerBallsGroup.x = 80;
	this.playerBallsGroup.y = 60 + 16;

	this.aiBallsGroup = new Kiwi.Group( this.state );
	this.aiBallsGroup.x = this.game.stage.width - 80;
	this.aiBallsGroup.y = 60 + 16;
	this.aiBallsGroup.scaleX = -1;


	this.generateBalls();

}

FridayGameJam.Managers.HUD.prototype.generateBalls = function() {

	var len = this.player.lives; 
	while(len--) {
		this.createPlayerBall();
	}


	var len = this.ai.lives; 
	while(len--) {
		this.createAIBall();
	}

}


FridayGameJam.Managers.HUD.prototype.createPlayerBall = function() {
	var staticBall = new Kiwi.GameObjects.StaticImage(this.state, this.state.textures['ball-hud'], 0, 0);
	staticBall.cellIndex = 1;
	staticBall.x = staticBall.width * this.playerLiveBalls.length;
	this.playerLiveBalls.push(staticBall);
	this.playerBallsGroup.addChild(staticBall); 
}

FridayGameJam.Managers.HUD.prototype.createAIBall = function() {
	var staticBall = new Kiwi.GameObjects.StaticImage(this.state, this.state.textures['ball-hud'], 0, 0);
	staticBall.x = (staticBall.width * this.aiLiveBalls.length);
	this.aiLiveBalls.push(staticBall);
	this.aiBallsGroup.addChild(staticBall); 
}

FridayGameJam.Managers.HUD.prototype.addToStage = function() {

	this.state.addChild(this.scoreText);
	this.state.addChild(this.levelText);
	this.state.addChild(this.playerBallsGroup);
	this.state.addChild(this.aiBallsGroup);
	
}

FridayGameJam.Managers.HUD.prototype.update = function() {

	this.scoreText.text = 'SCORE: ' + this.score;
	this.levelText.text = 'LEVEL: ' + this.ai.level;




}