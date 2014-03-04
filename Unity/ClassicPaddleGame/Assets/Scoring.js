#pragma strict

static var scorep1: int;
static var scorep2: int;

function Start () {
	//start the scores at 0 - 0
	scorep1 = 0;
	scorep2 = 0;
}

function OnGUI () {
	//place the scoring boxes on top right and top left of the screen
	GUI.Box(Rect(10, 10, 90, 30), "Player 1: " + scorep1);
	GUI.Box(Rect(Screen.width - 100, 10, 90, 30), "Player 2: " + scorep2);
}