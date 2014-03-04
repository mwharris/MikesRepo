#pragma strict

var BounceSound : AudioClip;
var BreakSound : AudioClip;
var DeathSound : AudioClip;
var LaunchSound : AudioClip;
var launched : boolean;

static var launchTimer : float;
static var xSpeed : float;
static var ySpeed : float;
static var collFlag : boolean;
static var collCounter : int;
static var collThresh : int;

function Start () {
	launchTimer = 2.0;
	xSpeed = 8.0;
	ySpeed = -8.0;
	collFlag = true;
	collCounter = 0;
	collThresh = 8;
	launched = false;
}

function Update () {
	//set the z position to 0 to keep the ball from moving 
	//towards or away from the board
	transform.position.z = 0;
	
	//start the timer
	launchTimer -= Time.deltaTime;
	
	//timer logic
	if(launchTimer <= 0.0){
		//play the launch sound
		if(!launched){
			launched = true;
			audio.PlayOneShot(LaunchSound);
		}
	
		//move the ball
		transform.Translate(Vector3(xSpeed, ySpeed, 0) * Time.deltaTime);
		launchTimer = 0.0;
	}
	
	//check if we've had a certain amount of collisions
	if(collCounter >= collThresh){
		//increase the x and y velocity
		if(xSpeed < 0){
			xSpeed -= 1;
		} else {
			xSpeed += 1;
		}
		if(ySpeed < 0){
			ySpeed -= 1;
		} else {
			ySpeed += 1;
		}
		
		//reset the counter
		collCounter = 0;
	}
}


function OnTriggerEnter(other : Collider){
	//if we collided with any of the walls
	if(other.name.Contains("Boundary") && other.name != "BoundaryLower"){
		//play the wall beep sound
		audio.PlayOneShot(BounceSound);
	} 
	//if we collided with the paddle
	else if(other.name == "Paddle"){
		//play the regular beep sound
		audio.PlayOneShot(BounceSound);
	}
	//if we collided with a brick
	else if(other.name == "Brick"){
		//play the explosion sound
		audio.PlayOneShot(BreakSound);
	}
	else {
		//play the bounce sound when we hit something
		audio.PlayOneShot(DeathSound);
	}
}
