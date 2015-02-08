#pragma strict

static var score : int;
static var lives : int;
static var rocketPoints : int;
static var saucerPoints : int;
static var basePoints : int;
static var numRocketsKilled : int;

function Start () {
	score = 0;
	lives = 3;
	rocketPoints = 100;
	basePoints = 300;
	saucerPoints = 600;
}

function OnGUI () {
	//display boxes to show the score and lives
	GUI.Box(Rect(10, 10, 120, 30), "Score: " + score);
	GUI.Box(Rect(10, 50, 120, 30), "Lives: " + lives);
	
	//get a reference to the ship object
	var player : GameObject = GameObject.Find("ScrollingShip");
	
	//if the player is dead and out of lives
	if(GameStateScript.state == GameState.GameOver){
		//display a Game Over message
		GUI.Button(
			Rect(((Screen.width/2) - 200), ((Screen.height/2) - 50), 400, 50), 
			"Game Over"
		);
	}
	//if the player is dead but has lives remaining
	else if(GameStateScript.state == GameState.Dying){
		//display a Respawn message
		GUI.Button(
			Rect(((Screen.width/2) - 200), ((Screen.height/2) - 50), 400, 50), 
			"Respawning..."
		);
	}
	//if the player is alive
	else if(GameStateScript.state == GameState.GamePlay){
		//and the player has reached the end of the game
		if(player.transform.position.x < -25){
			//display an end-game message
			GUI.Button(
				Rect(((Screen.width/2) - 200), ((Screen.height/2) - 50), 400, 50),
				"The End"
			);
		}
	}
}