#pragma strict

static var singePlayer = false;

function OnGUI () {
	if(Menu.showStartText){
		var xLoc = ((Screen.width / 2) - 100);
		var yLoc = ((Screen.height / 2) - 50);
		
		//display the button for single player game
		if(GUI.Button(Rect(xLoc, yLoc, 200, 100), "Single Player")){
			//single player mode was selected
			singePlayer = true;
			Menu.showStartText = false;
			Menu.gameStart = true;
			Menu.init = true;
		}
	}
}