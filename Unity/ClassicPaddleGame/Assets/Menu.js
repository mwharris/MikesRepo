#pragma strict

static var gameStart = false;
static var init = false;
static var showStartText = true;

function OnGUI() {
	if(showStartText){
		var xLoc = ((Screen.width / 2) - 100);
		var yLoc = ((Screen.height / 2) - 50) - 150;
		
		GUI.Button(Rect(xLoc, yLoc, 200, 100), "Choose Play Mode:");	
	} 
}