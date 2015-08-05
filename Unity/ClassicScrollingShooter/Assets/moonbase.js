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
		GetComponent.<AudioSource>().PlayClipAtPoint(baseExplo, transform.position);
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
		scoring.score += scoring.goldBasePoints;
		GetComponent.<AudioSource>().PlayClipAtPoint(baseExplo, transform.position);
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
		scoring.score += scoring.goldBasePoints;
		GetComponent.<AudioSource>().PlayClipAtPoint(baseExplo, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
		
		//show the explosion
		Instantiate(explosion, transform.position, transform.rotation);
	}
}
