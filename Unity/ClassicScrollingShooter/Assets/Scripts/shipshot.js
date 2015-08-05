#pragma strict

public var shotSpeed : float = 1.0;
public var shotExplo : AudioClip;
public var player : GameObject;

function Awake(){
	player = GameObject.Find("ScrollingShip");
}

function Update () {
	transform.Translate(0, shotSpeed * Time.deltaTime, 0);
	
	//If the game is in the Game Playing state
	if(player && GameStateScript.state == GameState.GamePlay){
		//if the saucer shot gets too far away from our player
		if(player.transform.position.x - transform.position.x > 2.0){
			//destroy this shot
			Destroy(gameObject);
		}
	}
}

function OnTriggerEnter(other : Collider){
	//destroy the shot if we hit the terrain
	if(other.tag == "terrain"){
		GetComponent.<AudioSource>().PlayClipAtPoint(shotExplo, transform.position);
		Destroy(gameObject);
	}
}