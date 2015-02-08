#pragma strict

public var saucerShot : GameObject;
public var radius : float = 0.2;
private var centerX : float;
private var centerY : float;
private var saucerTime : float;
public var saucerExplosionSound : AudioClip;
public var saucerExplosion : GameObject;

function Start () {
	saucerTime = 0;
	centerX = transform.position.x;
	centerY = transform.position.y;
}

function Update () {
	saucerTime += Time.deltaTime;
	transform.position.x = centerX + radius * Mathf.Sin(saucerTime * 4.0);
	transform.position.y = centerY + radius * Mathf.Cos(saucerTime * 4.0);
	
	//if the ship is more than 3 units away
	var player : GameObject = GameObject.Find("ScrollingShip");
	if(player && GameStateScript.state == GameState.GamePlay){
		if(player.transform.position.x - transform.position.x < 3.0){
			//fire a shot if saucerTime is half of Pi
			if(saucerTime > 3.14159 / 2){
				Instantiate(
					saucerShot,
					Vector3(
						transform.position.x,
						transform.position.y,
						0.0	
					),
					Quaternion.AngleAxis(90, Vector3.forward)
				);
				saucerTime = 0.0;
			}
		}
	}
}

function OnTriggerEnter(other : Collider){
	var killed : boolean =  false;
	
	//check if the ship or shot hit us
	if(other.tag == "scrollingship"){
		killed = true;
		audio.PlayClipAtPoint(saucerExplosionSound, transform.position);
		Destroy(gameObject);
		
		//show the explosion
		Instantiate(saucerExplosion, transform.position, transform.rotation);

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
	if(other.tag == "shipshot"){
		killed = true;
		
		//add some points if it was a user shot
		scoring.score += scoring.saucerPoints;
		
		//show the explosion
		Instantiate(saucerExplosion, transform.position, transform.rotation);
		
		//player the explsion sound and destroy the saucer
		audio.PlayClipAtPoint(saucerExplosionSound, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
	}
	if(other.tag == "bomb"){
		killed = true;
		
		//add some points if it was a user shot
		scoring.score += scoring.saucerPoints;
		
		//show the explosion
		Instantiate(saucerExplosion, transform.position, transform.rotation);
		
		//player the explsion sound and destroy the saucer
		audio.PlayClipAtPoint(saucerExplosionSound, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
	}
	
	//if this saucer has been killed
	if(killed == true){
		//add it to the list of saucers that need to be reloaded
		//in case the players dies and respawns
		var xyLoc = new RespawnLoc();
		xyLoc.x = centerX;
		xyLoc.y = centerY;
		respawnFactory.saucersToRespawn.push(xyLoc);
	}
}