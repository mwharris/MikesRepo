#pragma strict

public var baseExplo : AudioClip;
public var explosion : GameObject;

function OnTriggerEnter(other : Collider){	
	//check if the ship crashed into this base
	if(other.tag == "scrollingship"){
		//play an explosion noise an destroy the building
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
		//add some score if it was a user shot that hit the rocket
		scoring.score += scoring.basePoints;
		
		//play explosion noise and destroy the shot and the building
		GetComponent.<AudioSource>().PlayClipAtPoint(baseExplo, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
		
		//show the explosion
		Instantiate(explosion, transform.position, transform.rotation);
	}
	
	//check if a ship's bomb has hit us
	if(other.tag == "bomb"){		
		//add some score if it was a user shot that hit the rocket
		scoring.score += scoring.basePoints;
		
		//play explosion noise and destroy the bomb and the building
		GetComponent.<AudioSource>().PlayClipAtPoint(baseExplo, transform.position);
		Destroy(gameObject);
		Destroy(other.gameObject);
		
		//show the explosion
		Instantiate(explosion, transform.position, transform.rotation);
	}
}