#pragma strict

var aShotSpeed : float;

function Start () {

}

function Update () {
	//move the shot downward
	transform.Translate(0, aShotSpeed * Time.deltaTime, 0);
	
	//if the shot gets too low, delete it
	if(transform.position.y < -8.0){
		Destroy(gameObject);
	}
}