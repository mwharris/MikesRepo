#pragma strict

var aShot : GameObject;
var state : int;
var timer : float;
var ExplosionSound : AudioClip;

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
		//have the alien shoot occasionally
		if(Mathf.FloorToInt(Random.value * 10000.0) % 2000 == 0){
			Instantiate(
				aShot,
				Vector3(transform.position.x, transform.position.y, 5),
				Quaternion.identity
			);
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