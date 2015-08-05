#pragma strict

public var rocketSpeed : float;
public var rocketExplodeSound : AudioClip;
public var rocketExplosion : GameObject;
public var sidewaysRocket : boolean = false;
public var sidewaysBackwardRocket : boolean = false;
public var player : GameObject;

private var flightTimer : float = 0.0;
private var launch : boolean = false;
private var upsideDown : boolean = false;

function Awake(){
	player = GameObject.Find("ScrollingShip");
}

function Start(){
	//determine if this rocket is upside down
	if(transform.rotation.x > 0){
		upsideDown = true;
	}
}

function Update () {
	//fire the rocket if the ship is nearing
	if(player && GameStateScript.state == GameState.GamePlay){
		//if the player has come within range, launch the rocket
		if(checkLaunchRules(player) == true){
			launch = true;
			transform.Translate(0, 0, rocketSpeed * Time.deltaTime);
			flightTimer += Time.deltaTime;
		}
		
		//delete the rocket after it has been flying for a while
		if(flightTimer > 7.0){
			Destroy(gameObject);
		}
	}
}

function checkLaunchRules(player : GameObject){
	//normal upwards facing rocket
	if(sidewaysRocket == false 
			&& sidewaysBackwardRocket == false
			&& player.transform.position.x - transform.position.x < 0.5 
			&& player.transform.position.x > transform.position.x){
		return true;
	} 
	//horizontally facing rocket
	else if(sidewaysRocket == true 
			&& Mathf.Abs(player.transform.position.y - transform.position.y) < 0.27
			&& player.transform.position.x - transform.position.x < 1){
		return true;
	} 
	//special case horizontally facing rocket.  This rocket
	//will fire when the player is on the same Y plane but
	//far on the X plane
	else if(sidewaysBackwardRocket == true
			&& Mathf.Abs(player.transform.position.y - transform.position.y) < 0.20
			&& player.transform.position.x - transform.position.x < 4){
		return true;
	} else if(launch == true){
		return true;
	} else {
		return false;
	}
}

function OnTriggerEnter(other : Collider){
	//check if the ship crashed into this rocket
	if(other.tag == "scrollingship"){
		//play the explosion noise and destroy the rocket
		GetComponent.<AudioSource>().PlayClipAtPoint(rocketExplodeSound, transform.position);
		Destroy(gameObject);

		//start the death timer
		scrollingship.deathTimer = 100;
		
		//determine the next game state
		scoring.lives--;
		if(scoring.lives <= 0){
			GameStateScript.state = GameState.GameOver;
		} else {
			GameStateScript.state = GameState.Dying;
		}
		
		//show the explosion
		Instantiate(rocketExplosion, transform.position, transform.rotation);
	} 
	
	//check if a ship's shot has hit us
	if(other.tag == "shipshot"){
		//add some score if it was a user shot that hit the rocket
		scoring.score += scoring.rocketPoints;
		
		//play the explosion and destory the shot and rocket
		GetComponent.<AudioSource>().PlayClipAtPoint(rocketExplodeSound, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
		
		//show the explosion
		Instantiate(rocketExplosion, transform.position, transform.rotation);
	}
	
	//check if a ship's bomb has hit us
	if(other.tag == "bomb"){		
		//add some score if it was a user shot that hit the rocket
		scoring.score += scoring.rocketPoints;
		
		//play the explosion and destory the bomb and rocket
		GetComponent.<AudioSource>().PlayClipAtPoint(rocketExplodeSound, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
		
		//show the explosion
		Instantiate(rocketExplosion, transform.position, transform.rotation);
	}
	
	//collide with the terrain only if the rocket
	//has been in flight for more than 0.2 seconds
	if(flightTimer > 0.2 && other.tag == "terrain"){
		//play the explosion sound and destroy the rocket
		GetComponent.<AudioSource>().PlayClipAtPoint(rocketExplodeSound, transform.position);
		Destroy(gameObject);
		
		//show the explosion
		Instantiate(rocketExplosion, transform.position, transform.rotation);
	}
}