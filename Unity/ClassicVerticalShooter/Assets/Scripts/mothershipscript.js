#pragma strict

var mothershipState : int;
var deathTimer : float;
var ExplosionSound : AudioClip;
var alienType : int;
var direction : int;
var motherShipDirection : int;
var currentLevel : int;
var rotations : int;

function Start () {
	mothershipState = 0;
	currentLevel = scoring.level;
	rotations = 0;
}

function Update () {
	//simple animation
	var index = Mathf.FloorToInt(Time.time * 7.0) % 4;
	var size = Vector2(0.25, 1);
	var offset = Vector2(index / 4.0, 0);
	renderer.material.SetTextureScale("_MainTex", size);
	renderer.material.SetTextureOffset("_MainTex", offset);
	
	if(GameStateScript.state != GameState.GameOver){
		//if the game is still going on OR if the ship was hit
		if(GameStateScript.state == GameState.GamePlay || GameStateScript.state == GameState.Dying){
			//reverse the direction of the mothership if they went too far
			if(transform.position.x < -GameStateScript.screenBoundary){
				//make the ship go right
				motherShipDirection = 2;
				rotations++;
			} else if(transform.position.x > GameStateScript.screenBoundary){
				//make the ship go left
				motherShipDirection = 1;
				rotations++;
			}
			
			if(motherShipDirection == 1){
				//move the mothership to the right
				transform.Translate(-2.5 * Time.deltaTime, 0, 0, Space.World);
			} else if(motherShipDirection == 2){
				//move the mothership to the left
				transform.Translate(2.5 * Time.deltaTime, 0, 0, Space.World);
			}
		}
	}
	
	//if the mothership is dying, start the death sequence
	if(mothershipState != 0){
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
	
	//if the game ends or the level is changed
	//or if it made on full rotation
	if(GameStateScript.state == GameState.PressStart || currentLevel != scoring.level
			|| rotations == 2){
		//destroy the mothership
		Destroy(gameObject);
	}
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "shot"){
		//increment the score
		scoring.score += 100;
		
		//play the explosion sound
		audio.PlayClipAtPoint(ExplosionSound, transform.position);
		
		//change the state of the alien to dieing
		mothershipState = 1;
		
		//start the deathTimer of the death sequence
		deathTimer = 5.0;
	
		//destroy the shot that hit the alien
		Destroy(other.gameObject);
	}
}