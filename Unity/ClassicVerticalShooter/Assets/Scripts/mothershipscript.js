#pragma strict

var state : int;
var deathTimer : float;
var ExplosionSound : AudioClip;
var alienType : int;

function Start () {

}

function Update () {
	if(GameStateScript.state != GameState.GameOver){
		//if the game is still going on
		if(GameStateScript.state == GameState.GamePlay){
			//reverse the direction of the mothership if they went too far
			if(transform.position.x < -GameStateScript.screenBoundary){
				alienfactory.alienDirection = 1;
			}
			if(transform.position.x > GameStateScript.screenBoundary){
				alienfactory.alienDirection = 2;
			}
			
			//move the aliens in the direction desired
			if(alienfactory.alienDirection == 1){
				//move the aliens to the right
				transform.Translate(0.6 * Time.deltaTime, 0, 0, Space.World);
			} else {
				//move the aliens to the left
				transform.Translate(-0.6 * Time.deltaTime, 0, 0, Space.World);
			}
		}
	}
	
	//if the mothership is dying, start the death sequence
	if(state == 1){
		//spin the mothership
		transform.Rotate(0, 0, Time.deltaTime * 400.0);
		
		//move the mothership upwards off the screen
		transform.Translate(
			0.3 * Time.deltaTime,
			3.0 * Time.deltaTime,
			0,
			Space.World
		);
		
		//shrink the mothership by 1%
		transform.localScale = transform.localScale * 0.99;
		
		//decrement the deathTimer
		deathTimer -= 0.1;
		if(deathTimer < 0){
			//destroy the mothership once the deathTimer has ended
			Destroy(gameObject);
		}
	}
	
	//destroy the aliens if the game has ended
	if(GameStateScript.state == GameState.PressStart){
		Destroy(gameObject);
	}
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "shot"){
		//increment the score depending on alien type
		if(alienType == 0){
			scoring.score += 10;
		} else if(alienType == 1){
			scoring.score += 15;
		} else if(alienType == 2){
			scoring.score += 20;
		} else if(alienType == 3){
			scoring.score += 25;
		} else if(alienType == 4){
			scoring.score += 30;
		}
		
		//play the explosion sound
		audio.PlayClipAtPoint(ExplosionSound, transform.position);
		
		//change the state of the alien to dieing
		state = 1;
		
		//start the deathTimer of the death sequence
		deathTimer = 5.0;
	
		//destroy the shot that hit the alien
		Destroy(other.gameObject);
	}
}