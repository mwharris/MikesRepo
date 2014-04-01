#pragma strict

var aShot : GameObject;
var state : int;
var deathTimer : float;
var ExplosionSound : AudioClip;
var alienType : int;

//array with the shooting rates of the each level
static var levelArray = [50, 30, 20, 10];

function Start () {

}

function Update () {
	//simple animation
	var index = Mathf.FloorToInt(Time.time * 7.0) % 4;
	var size = Vector2(0.25, 1);
	var offset = Vector2(index / 4.0, 0);
	renderer.material.SetTextureScale("_MainTex", size);
	renderer.material.SetTextureOffset("_MainTex", offset);
	
	if(GameStateScript.state != GameState.GameOver){
		//variable to keep track of the spot in the array
		var levelIndex : int;
		levelIndex = scoring.level - 1;
		
		//handle if the level index goes outside the boundaries of our array
		if(levelIndex > 3){
			levelIndex = 3;
		} else if(levelIndex < 0){
			levelIndex = 0;
		}
		
		//if the game is still going on
		if(GameStateScript.state == GameState.GamePlay){
			//fire ocassionally depending on the shot rate of the level we are on
			if(Mathf.FloorToInt(Random.value * 10000.0) 
					% (levelArray[levelIndex] * scoring.alienCounter) == 0){
				Instantiate(
					aShot,
					Vector3(transform.position.x, transform.position.y, 5),
					Quaternion.identity
				);	
			}
			
			//reverse the direction of the aliens if they went too far
			//also lower the aliens down to the next row
			if(transform.position.x < -GameStateScript.screenBoundary){
				alienfactory.alienDirection = 1;
			}
			if(transform.position.x > GameStateScript.screenBoundary){
				alienfactory.alienDirection = 2;
			}
			
			//move the aliens in the direction desired
			if(alienfactory.alienDirection == 1){
				//move the aliens to the right
				transform.Translate(0.3 * Time.deltaTime, 0, 0, Space.World);
			} else {
				//move the aliens to the left
				transform.Translate(-0.3 * Time.deltaTime, 0, 0, Space.World);
			}
		}
	}
	
	//if the alien is dying, start the death sequence
	if(state == 1){
		//spin the alien
		transform.Rotate(0, 0, Time.deltaTime * 400.0);
		
		//move the alien upwards off the screen
		transform.Translate(
			0.3 * Time.deltaTime,
			3.0 * Time.deltaTime,
			0,
			Space.World
		);
		
		//shrink the alien by 1%
		transform.localScale = transform.localScale * 0.99;
		
		//decrement the deathTimer
		deathTimer -= 0.1;
		if(deathTimer < 0){
			//destroy the alien once the deathTimer has ended
			Destroy(gameObject);
			
			//decrement aliens and check for level change
			scoring.alienCounter--;
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