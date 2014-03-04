#pragma strict

function OnTriggerEnter (other : Collider) {
	//reverse the x velocity
	BallScript.xSpeed = -BallScript.xSpeed;
	
	//flag a collision
	BallScript.collFlag = true;
	
	//increment the collision counter
	BallScript.collCounter++;
}