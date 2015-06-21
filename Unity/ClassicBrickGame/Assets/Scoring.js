#pragma strict

static var score : int;
static var lives : int;

function Start () {
	score = 0;
	lives = 3;
}

function OnGUI () {
	var style = new GUIStyle();
	style.alignment = TextAnchor.UpperLeft;

	GUI.Box(Rect(10, 10, 90, 30), "Score:  " + score, style);
	GUI.Box(Rect(Screen.width - 200, 10, 90, 30), "Lives:  " + lives, style);
	//GUI.Box(Rect(Screen.width - 200, 50, 200, 30), "Collision Counter:  " + BallScript.collCounter, style);
	//GUI.Box(Rect(Screen.width - 200, 100, 200, 30), "X Speed:  " + BallScript.xSpeed, style);
	//GUI.Box(Rect(Screen.width - 200, 150, 200, 30), "Y Speed:  " + BallScript.ySpeed, style);
}