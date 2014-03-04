#pragma strict

static var score : int;
static var lives : int;

function InitializeGame () {
	score = 0;
	lives = 3;
}

function Start () {
	InitializeGame();
}

function OnGUI(){
	//display two boxes on the screen to display the score and lives
	GUI.Box(Rect(10, 10, 90, 30), "Score: " + score);
	GUI.Box(Rect(Screen.width - 100, 10, 90, 30), "Lives: " + lives);
}