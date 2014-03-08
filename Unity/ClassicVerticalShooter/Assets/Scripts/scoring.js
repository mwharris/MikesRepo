#pragma strict

static var score : int;
static var lives : int;
static var alienCounter : int;
static var level : int;
public var customButton : GUIStyle;

function InitializeGame () {
	score = 0;
	lives = 3;
	level = 1;
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

	//display boxes on the screen for debug purposes
	GUI.Box(Rect(10, 10, 90, 30), "Score: " + score);									//score
	GUI.Box(Rect(Screen.width - 100, 10, 90, 30), "Lives: " + lives);					//lives
	GUI.Box(Rect(10, 50, 90, 30), "State: " + GameStateScript.state);					//game state
	GUI.Box(Rect(Screen.width - 100, 50, 90, 30), "Aliens: " + scoring.alienCounter);	//aliens
	GUI.Box(Rect(Screen.width/2 - 60, 10, 120, 30), "Level: " + scoring.level);			//level
}