var FridayGameJam = FridayGameJam || {};

FridayGameJam.Managers.HUD = function(state, ai, player) {

	this.state = state;
	this.game = this.state.game;
	this.ai = ai;
	this.player = player;

	this.score = 0;

	this.scoreText = new Kiwi.GameObjects.Textfield(this.state, 'Score: ' + this.score, 40, 30, '#fff', 14, 'bold', 'Orbitron' );
	this.levelText = new Kiwi.GameObjects.Textfield(this.state, 'Level: ' + this.ai.level, this.game.stage.width - 40, 30, '#fff', 14, 'bold', 'Orbitron' );

	this.levelText.textAlign = 'right';

	this.playerLiveBalls = [];
	this.aiLiveBalls = [];

	this.playerBallsGroup = new Kiwi.Group( this.state );
	this.playerBallsGroup.x = 35;
	this.playerBallsGroup.y = this.game.stage.height - 46;

	this.aiBallsGroup = new Kiwi.Group( this.state );
	this.aiBallsGroup.x = this.game.stage.width - 35;
	this.aiBallsGroup.y = this.game.stage.height - 46;
	this.aiBallsGroup.scaleX = -1;


	this.generateBalls();

}

FridayGameJam.Managers.HUD.prototype.increaseScore = function(amount) {
	this.score += Math.abs(amount);
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
	var staticBall = new FridayGameJam.GameObjects.Live(this.state);
	staticBall.cellIndex = 1;
	staticBall.x = staticBall.width * this.playerLiveBalls.length;
	this.playerLiveBalls.push(staticBall);
	this.playerBallsGroup.addChild(staticBall); 
}

FridayGameJam.Managers.HUD.prototype.createAIBall = function() {
	var staticBall = new FridayGameJam.GameObjects.Live(this.state);
	staticBall.x = (staticBall.width * this.aiLiveBalls.length);
	this.aiLiveBalls.push(staticBall);
	this.aiBallsGroup.addChild(staticBall); 
}


FridayGameJam.Managers.HUD.prototype.matchAiLives = function() {

	var aiLives = this.ai.lives;

	if(aiLives > this.aiLiveBalls.length) {
		//Create more balls
		var diffLen = aiLives - this.aiLiveBalls.length;
		while(diffLen--) {
			this.createAIBall();
		}

	} else if(aiLives < this.aiLiveBalls.length) {
		//Delete lives
		if(aiLives >= 0) {
			var diffLen = this.aiLiveBalls.length - aiLives;
			while(diffLen--) {
				this.aiLiveBalls[this.aiLiveBalls.length - diffLen - 1].delete();
				this.aiLiveBalls.splice(this.aiLiveBalls.length - diffLen - 1, 1);
			}
		}
	}

}

FridayGameJam.Managers.HUD.prototype.matchPlayerLives = function() {

	var playerLives = this.player.lives;

	if(playerLives > this.playerLiveBalls.length) {
		//Create more balls
		var diffLen = playerLives - this.playerLiveBalls.length ;
		while(diffLen--) {
			this.createPlayerBall();
		}

	} else if(playerLives < this.playerLiveBalls.length) {
		//Delete lives
		if(playerLives >= 0) {
			var diffLen = this.playerLiveBalls.length - playerLives;
			while(diffLen--) {
				this.playerLiveBalls[this.playerLiveBalls.length - diffLen - 1].delete();
				this.playerLiveBalls.splice(this.playerLiveBalls.length - diffLen - 1, 1);
			}
		}
	}

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

	//Check the lives 
	if(this.ai.lives !== this.aiLiveBalls.length) {
		this.matchAiLives();
	} 

	if(this.player.lives !== this.playerLiveBalls.length) {
		this.matchPlayerLives();
	}

}