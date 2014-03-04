#pragma strict

var BeepSound : AudioClip;

function OnTriggerEnter (other : Collider) {
	//move the ball back into sart position
	other.transform.position = Vector3(0, -7, 0);
	
	//give the ball an initial speed
	BallScript.xSpeed = 8.0;
	BallScript.ySpeed = -8.0;
	
	//wait a second before launching the ball
	BallScript.launchTimer = 1.0;
	
	if(Scoring.lives == 0){
		Application.LoadLevel("BrickTitleScene");
	} else {
		//decrement a life
		Scoring.lives--;
	}
}