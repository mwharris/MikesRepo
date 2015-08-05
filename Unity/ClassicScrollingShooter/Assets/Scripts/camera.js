#pragma strict

public var player : GameObject;

//initialize the camera's x position to the scrolling ship
function Start(){
	//move the camera to the player's position
	transform.position = new Vector3(player.transform.position.x - 0.7, player.transform.position.y, transform.position.z);
}

function Update () {	
	//only move the camera if the player is still alive
	if(player && GameStateScript.state == GameState.GamePlay){
		//get the player's y position
		var yPos : float = player.transform.position.y;
	
		//if the player moves too far up or down then
		//relocate the camera to follow the ship
		var newYPos = transform.position.y;
		if(newYPos < yPos - 0.3){
			newYPos = yPos - 0.3;
		}
		if(newYPos > yPos + 0.3){
			newYPos = yPos + 0.3;
		}
	
		//move the camera
		transform.Translate(0.3 * Time.deltaTime, 0, 0);
		transform.position = new Vector3(transform.position.x, newYPos, transform.position.z);
	}
}