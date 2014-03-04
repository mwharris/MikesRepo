#pragma strict

function OnTriggerEnter (other : Collider) {
	//reverse the y velocity
	BallScript.ySpeed = -BallScript.ySpeed;
	
	//flag a collision
	BallScript.collFlag = true;
	
	//increment the collision counter
	BallScript.collCounter++;
}