#pragma strict
import UnityEngine.UI;

static var score : int;
static var lives : int;
static var rocketPoints : int;
static var saucerPoints : int;
static var basePoints : int;
static var goldBasePoints : int;
var scoreTextObj : Text;
var livesTextObj : Text;
var player : GameObject;

function Awake(){
	score = 0;
	lives = 3;
	rocketPoints = 100;
	saucerPoints = 600;
	basePoints = 300;
	goldBasePoints = 1000;
	player = GameObject.Find("ScrollingShip");
}

function OnGUI () {
	//display boxes to show the score and lives
    scoreTextObj.text = "SCORE: " + score.ToString();
    livesTextObj.text = "LIVES: " + lives.ToString();
	
	//if the player is alive
	if(GameStateScript.state == GameState.GamePlay){
		//and the player has reached the end of the game
		if(player.transform.position.x < -78){
			//mark the game state as mission completed
			GameStateScript.state = GameState.Finished;
		}
	}
}