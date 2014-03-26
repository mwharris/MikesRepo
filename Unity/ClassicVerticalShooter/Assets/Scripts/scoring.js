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
	//if we are on the initial splash screen to choose a ship
	if(GameStateScript.state == GameState.PressStart){
		//Create some Welcome Text / Instructions
		customButton.alignment = TextAnchor.UpperCenter;
		GUI.TextArea(Rect(Screen.width/2 - 275, Screen.height/2 - 250, 550, 90), "Please choose a ship type to use. "
			+ "\n "
			+ "You can also change the ship type in-game \n using the '1' and '2' keys:", customButton);
	
		//Create buttons for choosing a ship
		customButton.alignment = TextAnchor.MiddleCenter;
		if(GUI.Button(Rect(Screen.width/2 - 175, Screen.height/2 - 150, 150, 50), "Manta Ray", customButton)){
			shipscript.shipType = 1;
		}
		if(GUI.Button(Rect(Screen.width/2 + 25, Screen.height/2 - 150, 150, 50), "Swordfish", customButton)){
			shipscript.shipType = 2;
		}
		
		//Create a confirm button to move to the next phase
		if(GUI.Button(Rect(Screen.width/2 - 150, Screen.height/2 + 50, 300, 50), "Click Me to Start", customButton)){
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