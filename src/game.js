
/**
* The core FridayGameJam game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 

var gameOptions = {
	renderer: Kiwi.RENDERER_AUTO, 
	width: 540,
	height: 410,
	deviceTarget: Kiwi.TARGET_BROWSER
}

var game = new Kiwi.Game('content', 'FridayGameJam', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(FridayGameJam.Loading);
game.states.addState(FridayGameJam.Intro);
game.states.addState(FridayGameJam.Play);

game.states.switchState("Loading");