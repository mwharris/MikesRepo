#pragma strict

var aShot : GameObject;
var state : int;
var timer : float;
var ExplosionSound : AudioClip;

//array with the shooting rates of the each level
static var levelArray = [50, 30, 20, 10];

function Start () {

}

function Update () {
	//simple animation
	var index = Mathf.FloorToInt(Time.time * 12.0) % 4;
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
		
		//decrement the timer
		timer -= 0.1;
		if(timer < 0){
			//destroy the alien once the timer has ended
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
		//increment the score
		scoring.score += 10;
		
		//play the explosion sound
		audio.PlayClipAtPoint(ExplosionSound, transform.position);
		
		//change the state of the alien to dieing
		state = 1;
		
		//start the timer of the death sequence
		timer = 5.0;
	
		//destroy the shot that hit the alien
		Destroy(other.gameObject);
	}
}