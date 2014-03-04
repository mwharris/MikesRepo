#pragma strict

function OnTriggerEnter (other : Collider) {
	//if the ball collides with a brick
	if(BallScript.collFlag == true){
		//reverse the y speed of the ball to turn it around
		BallScript.ySpeed = -BallScript.ySpeed;
		
		//reset the collision flag
		BallScript.collFlag = false;
	
		//increment the collision counter
		BallScript.collCounter++;
		
		//increment the score
		Scoring.score += 10;
		
		//destroy the brick that was hit
		Destroy(gameObject);
	}
}