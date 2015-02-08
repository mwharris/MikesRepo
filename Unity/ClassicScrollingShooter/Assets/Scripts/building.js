#pragma strict

public var baseExplo : AudioClip;
private var initialX : float;
private var initialY : float;
public var explosion : GameObject;

function Start(){
	initialX = transform.position.x;
	initialY = transform.position.y;
}

function OnTriggerEnter(other : Collider){
	var killed : boolean =  false;
	
	//check if the ship crashed into this base
	if(other.tag == "scrollingship"){
		killed = true;
		audio.PlayClipAtPoint(baseExplo, transform.position);
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
		Instantiate(explosion, transform.position, transform.rotation);
	} 
	
	//check if a ship's shot has hit us
	if(other.tag == "shipshot"){
		killed = true;
		
		//add some score if it was a user shot that hit the rocket
		scoring.score += scoring.basePoints;
		audio.PlayClipAtPoint(baseExplo, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
		
		//show the explosion
		Instantiate(explosion, transform.position, transform.rotation);
	}
	
	//check if a ship's bomb has hit us
	if(other.tag == "bomb"){
		//decrement the bomb counter
		//scrollingship.bombCounter--;
		killed = true;
		
		//add some score if it was a user shot that hit the rocket
		scoring.score += scoring.basePoints;
		audio.PlayClipAtPoint(baseExplo, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
		
		//show the explosion
		Instantiate(explosion, transform.position, transform.rotation);
	}
	
	//if this rocket has been killed but has not launched
	if(killed == true){
		//add this rocket to the respawn list
		addBaseToRespawnList();
	}
}

function addBaseToRespawnList(){
	//add this base to the list of bases that need to be reloaded
	//in case the players dies and respawns
	var xyLoc = new RespawnLoc();
	xyLoc.x = initialX;
	xyLoc.y = initialY;
	
	respawnFactory.basesToRespawn.push(xyLoc);
}