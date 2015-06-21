#pragma strict
import UnityEngine.UI;

static var score : int;
static var savedCheckpointScore : int;
static var lives : int;
static var rocketPoints : int;
static var saucerPoints : int;
static var basePoints : int;
var scoreTextObj : Text;
var livesTextObj : Text;

function Start () {
	score = 0;
	savedCheckpointScore = 0;
	lives = 3;
	rocketPoints = 100;
	basePoints = 300;
	saucerPoints = 600;
}

function Update(){
	/*
	//if the player died handle the scoring change unless it was the 
	//final life because then that is the final score
	if(GameStateScript.state == GameState.Dying && lives != 0){
		score = savedCheckpointScore;
	}
	*/
}

function OnGUI () {
	//display boxes to show the score and lives
    scoreTextObj.text = "SCORE: " + score.ToString();
    livesTextObj.text = "LIVES: " + lives.ToString();
	
	//get a reference to the ship object
	var player : GameObject = GameObject.Find("ScrollingShip");
	
	//if the player is dead and out of lives
	if(GameStateScript.state == GameState.GameOver){
		//display a Game Over message
		//GUI.Button(
		//	Rect(((Screen.width/2) - 200), ((Screen.height/2) - 50), 400, 50), 
		//	"Game Over"
		//);
	}
	//if the player is dead but has lives remaining
	else if(GameStateScript.state == GameState.Dying){
		//display a Respawn message
		//GUI.Button(
		//	Rect(((Screen.width/2) - 200), ((Screen.height/2) - 50), 400, 50), 
		//	"Respawning..."
		//);
	}
	//if the player is alive
	else if(GameStateScript.state == GameState.GamePlay){
		//and the player has reached the end of the game
		if(player.transform.position.x < -100){
			//display an end-game message
			GUI.Button(
				Rect(((Screen.width/2) - 200), ((Screen.height/2) - 50), 400, 50),
				"The End"
			);
		}
	}
}