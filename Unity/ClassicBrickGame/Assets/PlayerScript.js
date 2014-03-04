#pragma strict

var BeepSound : AudioClip;

function Start(){
	Screen.lockCursor = true;
}

function Update () {
	var left : GameObject;
	var right : GameObject;
	
	left = GameObject.Find("BoundaryLeft");
	right = GameObject.Find("BoundaryRight");
	
	if(Input.GetKey("left")){
		if((transform.position.x - 2) <= (left.transform.position.x + .5)){
			transform.position.x = (left.transform.position.x + .5) + 2;
		} else {
			transform.Translate(-20 * Time.deltaTime, 0, 0);
		}
	}
	
	if(Input.GetKey("right")){
		if((transform.position.x + 2) >= (right.transform.position.x - .5)){
			transform.position.x = (right.transform.position.x - .5) - 2;
		} else {
			transform.Translate(20 * Time.deltaTime, 0, 0);
		}
	}
	
	if(Input.GetAxis("Mouse X")){
		var h = 50.0 * Time.deltaTime * Input.GetAxis("Mouse X");
	
		if((transform.position.x + 2) >= (right.transform.position.x - .5)){
			transform.position.x = (right.transform.position.x - .5) - 2;
		} else if((transform.position.x - 2) <= (left.transform.position.x + .5)){
			transform.position.x = (left.transform.position.x + .5) + 2;
		}
			
		transform.Translate(h, 0, 0);
	}
}

//function to handle when the ball collides with the paddle
function OnTriggerEnter (other : Collider){
	//reverse the y-speed of the ball
	BallScript.ySpeed = -BallScript.ySpeed;
	
	//determine the location of the ball relative to the paddle
	var collisionX = other.collider.gameObject.transform.position.x - gameObject.transform.position.x;
	
	//bounce the ball at an x velocity according to where the collision was
	BallScript.xSpeed = collisionX * 5;
	
	//set the flag indicating a collision
	BallScript.collFlag = true;
	
	//increment the collision counter
	BallScript.collCounter++;
}