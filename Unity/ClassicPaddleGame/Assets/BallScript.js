#pragma strict

var BeepSound : AudioClip;

function Update () {
	//check if we are initializing the game
	if(Menu.init == true){
		//call a helper function to start the game
		startTheGame();
		
		//flag that we are done initializing
		Menu.init = false;
	}
	
	//never update the z-position
	transform.position.z = 0;
}

function startTheGame(){
	rigidbody.freezeRotation = true;
		
	//wait for 3 seconds before starting the game
	yield WaitForSeconds (3);
	
	//start the ball off to start the game
	rigidbody.AddForce (Random.Range(6, 8), Random.Range(-4, -3), 0);
}

function OnCollisionEnter (other : Collision) {
	//play the beep sound
	audio.PlayOneShot(BeepSound);	
	
	//add a little speed to the ball
	rigidbody.AddRelativeForce(rigidbody.velocity.normalized * .02, ForceMode.Impulse);
}