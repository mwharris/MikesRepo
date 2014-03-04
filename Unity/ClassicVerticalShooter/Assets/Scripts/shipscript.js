#pragma strict

var shipSpeed : float;
var screenBoundary : float;
var shot : GameObject;

function Start () {
	transform.position.y = -2.8;
}

function Update () {
	//move the ship left / right
	if(Input.GetKey("right")){
		transform.Translate(-shipSpeed * Time.deltaTime, 0, 0);
	}
	if(Input.GetKey("left")){
		transform.Translate(shipSpeed * Time.deltaTime, 0, 0);
	}
	
	//don't allow the ship to move too far left or right
	if(transform.position.x < -screenBoundary){
		transform.position.x = -screenBoundary;
	}
	if(transform.position.x > screenBoundary){
		transform.position.x = screenBoundary;
	}
	
	//fire a shot
	if(Input.GetKeyDown("space")){
		Instantiate(shot, Vector3(transform.position.x, transform.position.y, 5), Quaternion.identity);
	}
}

function OnTriggerEnter(other : Collider){
	//if a shot hits us
	if(other.tag == "ashot"){
		//destroy the ship and the shot
		Destroy(gameObject);
		Destroy(other.gameObject);
	}
}