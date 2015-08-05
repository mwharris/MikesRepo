#pragma strict

private var bombSpeed : float = 1.0;
private var rotationTimer : float = 0.35;
private var bombStartTime : float = 0;
public var bombExplo : AudioClip;
public var player : GameObject;

function Awake(){
	player = GameObject.Find("ScrollingShip");
}

function Start(){
	bombStartTime = Time.time;
}

function Update () {
	//move the bomb forwards
	transform.Translate(0, 0, ((0.3 + bombSpeed) * Time.deltaTime));
	
	//slowly rotate the bomb downards
	var timeSinceStart = Time.time - bombStartTime;
	if(timeSinceStart >= rotationTimer){
		if(transform.rotation.x < 0.5){
			transform.Rotate(1,0,0);
		} else {
			transform.rotation.x = 0.5;
		}
	}

	//destroy the bomb if it is too far away from the ship
	if(player && GameStateScript.state == GameState.GamePlay){
		if(player.transform.position.x - transform.position.x > 2.0){
			Destroy(gameObject);
		}
	}
}


function OnTriggerEnter(other : Collider){
	//destroy the shot if we hit the terrain
	if(other.tag == "terrain"){
		Destroy(gameObject);
		GetComponent.<AudioSource>().PlayClipAtPoint(bombExplo, transform.position);
	}
}