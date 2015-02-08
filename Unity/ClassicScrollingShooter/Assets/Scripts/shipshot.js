#pragma strict

var shotSpeed : float = 1.0;
public var shotExplo : AudioClip;

function Update () {
	transform.Translate(0, shotSpeed * Time.deltaTime, 0);

	var player : GameObject = GameObject.Find("ScrollingShip");
	if(player && GameStateScript.state == GameState.GamePlay){
		if(player.transform.position.x - transform.position.x > 2.0){
			Destroy(gameObject);
		}
	}
}

function OnTriggerEnter(other : Collider){
	//destroy the shot if we hit the terrain
	if(other.tag == "terrain"){
		audio.PlayClipAtPoint(shotExplo, transform.position);
		Destroy(gameObject);
	}
}