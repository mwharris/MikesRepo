#pragma strict

//function fires when it enters the triggers
//aka the scoring sections on the side of the board
function OnTriggerEnter (other : Collider) {
	//if we hit the right trigger
	if(other.transform.position.x > 0){
		//update player one's score
		Scoring.scorep1++;
	} 
	//if we hit the left trigger
	else {
		//update player two's score
		Scoring.scorep2++;
	}
	
	//reset the ball to the middle
	other.rigidbody.velocity = Vector3.zero;
	other.rigidbody.angularVelocity = Vector3.zero;
	other.transform.position = Vector3(0, 0, 0);
	
	//add some force
	other.rigidbody.AddForce (Random.Range(6, 8), Random.Range(-4, -3), 0);
}