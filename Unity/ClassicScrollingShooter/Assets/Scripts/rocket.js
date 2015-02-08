#pragma strict

public var rocketSpeed : float;
public var rocketExplodeSound : AudioClip;
public var rocketExplosion : GameObject;
public var initialX : float;
public var initialY : float;


private var flightTimer : float = 0.0;
private var launch : boolean = false;
private var upsideDown : boolean = false;
private var addedToRespawnList : boolean = false;

function Start(){
	initialX = transform.position.x;
	initialY = transform.position.y;
	if(transform.rotation.x > 0){
		upsideDown = true;
	}
}

function Update () {
	var killed : boolean =  false;
	
	//fire the rocket if the ship is nearing
	var player : GameObject = GameObject.Find("ScrollingShip");
	
	if(player && GameStateScript.state == GameState.GamePlay){
		//if the player has come within range, launch the rocket
		if((player.transform.position.x - transform.position.x < 0.5
				&& player.transform.position.x > transform.position.x)
				|| launch == true){
			launch = true;
			transform.Translate(0, 0, rocketSpeed * Time.deltaTime);
			flightTimer += Time.deltaTime;
			
			//add this rocket to the respawn list, the reason this is done here 
			//is so we can respawn the rockets that launch but don't reach the 
			//threshold and are not destroyed
			if(addedToRespawnList == false){
				addRocketToRespawnList();
			}
		}
		
		//delete the rocket after it has been flying for a while
		if(flightTimer > 5.0){
			Destroy(gameObject);
		}
	}
}

function OnTriggerEnter(other : Collider){
	var killed : boolean =  false;

	//check if the ship crashed into this rocket
	if(other.tag == "scrollingship"){
		killed = true;
		audio.PlayClipAtPoint(rocketExplodeSound, transform.position);
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
		killed = true;
	
		//add some score if it was a user shot that hit the rocket
		scoring.score += scoring.rocketPoints;
		scoring.numRocketsKilled++;
		audio.PlayClipAtPoint(rocketExplodeSound, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
		
		//show the explosion
		Instantiate(rocketExplosion, transform.position, transform.rotation);
	}
	
	//check if a ship's bomb has hit us
	if(other.tag == "bomb"){
		//decrement the bomb counter
		//scrollingship.bombCounter--;
		killed = true;
		
		//add some score if it was a user shot that hit the rocket
		scoring.score += scoring.rocketPoints;
		scoring.numRocketsKilled++;
		audio.PlayClipAtPoint(rocketExplodeSound, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
		
		//show the explosion
		Instantiate(rocketExplosion, transform.position, transform.rotation);
	}
	
	//collide with the terrain only if the rocket
	//has been in flight for more than 1s
	if(flightTimer > 1.0 && other.tag == "terrain"){
		killed = true;
		audio.PlayClipAtPoint(rocketExplodeSound, transform.position);
		Destroy(gameObject);
		
		//show the explosion
		Instantiate(rocketExplosion, transform.position, transform.rotation);
	}
	
	//if this rocket has been killed but has not launched
	if(killed == true && addedToRespawnList == false){
		//add this rocket to the respawn list
		addRocketToRespawnList();
	}
}

function addRocketToRespawnList(){
	//add this rocket to the list of rockets that need to be reloaded
	//in case the players dies and respawns
	var xyLoc = new RespawnLoc();
	xyLoc.x = initialX;
	xyLoc.y = initialY;
	
	if(upsideDown == true){
		xyLoc.upsideDownRocket = true;
	}
	
	respawnFactory.rocketsToRespawn.push(xyLoc);
	addedToRespawnList = true;
}