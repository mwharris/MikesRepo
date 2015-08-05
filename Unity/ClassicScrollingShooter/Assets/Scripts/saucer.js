#pragma strict

public var saucerShot : GameObject;
public var radius : float = 0.2;
private var centerX : float;
private var centerY : float;
private var saucerTime : float;
public var saucerExplosionSound : AudioClip;
public var saucerExplosion : GameObject;
public var player : GameObject;

function Awake(){
	player = GameObject.Find("ScrollingShip");
}

function Start () {
	saucerTime = 0;
	centerX = transform.position.x;
	centerY = transform.position.y;
}

function Update () {
	saucerTime += Time.deltaTime;
	transform.position.x = centerX + radius * Mathf.Sin(saucerTime * 4.0);
	transform.position.y = centerY + radius * Mathf.Cos(saucerTime * 4.0);
	
	//if the ship is less than 3 units away
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
	//check if the ship or shot hit us
	if(other.tag == "scrollingship"){
		//play the explosion sound and destroy the saucer
		GetComponent.<AudioSource>().PlayClipAtPoint(saucerExplosionSound, transform.position);
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
		//add some points if it was a user shot
		scoring.score += scoring.saucerPoints;
		
		//show the explosion
		Instantiate(saucerExplosion, transform.position, transform.rotation);
		
		//player the explsion sound and destroy the saucer
		GetComponent.<AudioSource>().PlayClipAtPoint(saucerExplosionSound, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
	}
	if(other.tag == "bomb"){		
		//add some points if it was a user shot
		scoring.score += scoring.saucerPoints;
		
		//show the explosion
		Instantiate(saucerExplosion, transform.position, transform.rotation);
		
		//player the explsion sound and destroy the saucer
		GetComponent.<AudioSource>().PlayClipAtPoint(saucerExplosionSound, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
	}
}