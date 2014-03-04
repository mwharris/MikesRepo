#pragma strict

var shotSpeed : float;

function Start () {

}

function Update () {
	//fire the shot
	transform.Translate(0, shotSpeed * Time.deltaTime, 0);
	
	//delete the shot once it reaches off screen
	if(transform.position.y > 6.0){
		Destroy(gameObject);
	}
}