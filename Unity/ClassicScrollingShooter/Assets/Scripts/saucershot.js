#pragma strict

var shotSpeed : float = 1.0;
var shipExplosionSound : AudioClip;
var shipExplosion : GameObject;
var startDistance : int;
var distance : float = 0.0;

function Start(){
	startDistance = transform.position.x;
}

function Update () {
	transform.Translate(0, shotSpeed * Time.deltaTime, 0);
	
	var player : GameObject = GameObject.Find("ScrollingShip");
	if(player && GameStateScript.state == GameState.GamePlay){
		//destroy the shot if it gets too far away from the player
		if(player.transform.position.x - transform.position.x > 3.0){
			Destroy(gameObject);
		}
	}
	
	//destroy the shot if it gets too far away
	if(transform.position.x - startDistance > 2.0){
		Destroy(gameObject);
	}
}

function OnTriggerEnter(other : Collider){
	//destroy the shot if we hit the terrain
	if(other.tag == "terrain"){
		Destroy(gameObject);
	}
	
	//destroy the shot if we hit the ship
	if(other.tag == "scrollingship"){
		Destroy(gameObject);
		GetComponent.<AudioSource>().PlayClipAtPoint(shipExplosionSound, transform.position);
		
		//show the explosion
		Instantiate(shipExplosion, transform.position, transform.rotation);

		//start the death timer
		scrollingship.deathTimer = 100;
		
		//determine the next game state
		scoring.lives--;
		if(scoring.lives <= 0){
			GameStateScript.state = GameState.GameOver;
		} else {
			GameStateScript.state = GameState.Dying;
		}
	}
}