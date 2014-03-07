#pragma strict

static var score : int;
static var lives : int;
public var customButton : GUIStyle;

function InitializeGame () {
	score = 0;
	lives = 3;
}

function Start () {
	InitializeGame();
}

function OnGUI(){
	//if we are in the PressStart Game State
	if(GameStateScript.state == GameState.PressStart){
		//Create a button and wait for it to be clicked
		if(GUI.Button(Rect(Screen.width/2 - 150, Screen.height/2 - 50, 300, 50), "Click Me to Start", customButton)){
			//change the game state to start the game
			GameStateScript.state = GameState.StartingPlay;
		}
	}
	
	//if we hit the Game Over screen
	if(GameStateScript.state == GameState.GameOver){
		//display a Try Again button and bind the click
		if(GUI.Button(Rect(Screen.width/2 - 200, Screen.height/2 - 50, 400, 50), "Game Over, Try Again", customButton)){
			//re-initialize the game
			InitializeGame();
			GameStateScript.state = GameState.PressStart;
		}
	}

	//display boxes on the screen to display the score, lives, and game state
	GUI.Box(Rect(10, 10, 90, 30), "Score: " + score);
	GUI.Box(Rect(Screen.width - 100, 10, 90, 30), "Lives: " + lives);
	GUI.Box(Rect(Screen.width/2 - 30, 10, 90, 30), "State: " + GameStateScript.state);	
}