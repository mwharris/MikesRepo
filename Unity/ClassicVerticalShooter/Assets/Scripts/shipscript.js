#pragma strict

var shipSpeed : float;
var shot : GameObject;
var alienfactoryvar : alienfactory;
private var deathtimer : float;
var ShotSound : AudioClip;
var DeathSound : AudioClip;
var GameOver : AudioClip;
private var gameOverTimer : float;
private var gameOverThresh : int;

static var shipType : int;

function Start () {
	//initialize the ship to the clasic green one
	shipType = 1;
	transform.position.y = -2.8;
	gameOverThresh = 1.5;
	gameOverTimer = 0;
}

function Update(){
	//if we are at the initial splash screen
	if(GameStateScript.state == GameState.PressStart || GameStateScript.state == GameState.GamePlay){
		var size : Vector2;
		var offset : Vector2;
		gameOverThresh = 1.5;
		
		//change the ship sprite depending on the shipType chosen
		if(shipType == 1){
			size = Vector2(0.50, 1);
			offset = Vector2(0.50, 0);
		} else if(shipType == 2){
			size = Vector2(0.50, 0.9);
			offset = Vector2(0, 0);
		}
		renderer.material.SetTextureScale("_MainTex", size);
		renderer.material.SetTextureOffset("_MainTex", offset);
	}
	
	//if we are in the middle of game play
	if(GameStateScript.state == GameState.GamePlay){
		//activate the ship controls
		ShipControl();
		
		//reset the level if no more aliens are left
		if(scoring.alienCounter == 0){
			GameStateScript.state = GameState.StartingPlay;
			scoring.level++;
		}
	}
	
	//if we are initializing the game
	if(GameStateScript.state == GameState.StartingPlay){
		//create the enemies and change game state
		alienfactoryvar.MakeAliens();
		GameStateScript.state = GameState.GamePlay;
	}
	
	//if the ship died
	if(GameStateScript.state == GameState.Dying){
		//rotate the ship a little bit
		transform.Rotate(0, 0, Time.deltaTime * 400.0);
		
		//decrement the timer
		deathtimer -= 0.1;
		
		//disable the renderer
		if(deathtimer < 5.0){
			renderer.enabled = false;
		}
		
		if(deathtimer < 0){
			//set the game state to playing
			GameStateScript.state = GameState.GamePlay;
			
			//move the ship to center
			transform.position.x = 0.0;
			transform.position.z = 5.0;
			transform.rotation.w = 0;
			transform.rotation.x = 0;
			transform.rotation.y = 0;
			transform.rotation.z = 0;
			
			//enable renderer again
			renderer.enabled = true;
		}
	}
	
	if(GameStateScript.state == GameState.GameOver && gameOverThresh != 0){
		gameOverTimer = gameOverTimer + Time.deltaTime;
		
		if(gameOverTimer > gameOverThresh){
			audio.PlayOneShot(GameOver);
			gameOverThresh = 0;
			gameOverTimer = 0;
		}
	}
}

function ShipControl () {
	//move the ship left / right
	if(Input.GetKey("right")){
		transform.Translate(-shipSpeed * Time.deltaTime, 0, 0);
	}
	if(Input.GetKey("left")){
		transform.Translate(shipSpeed * Time.deltaTime, 0, 0);
	}
	
	//change the ship type if the player chooses
	if(Input.GetKey(KeyCode.Alpha1)){
		shipType = 1;
	}
	if(Input.GetKey(KeyCode.Alpha2)){
		shipType = 2;
	}
	
	//don't allow the ship to move too far left or right
	if(transform.position.x < -GameStateScript.screenBoundary){
		transform.position.x = -GameStateScript.screenBoundary;
	}
	if(transform.position.x > GameStateScript.screenBoundary){
		transform.position.x = GameStateScript.screenBoundary;
	}
	
	//fire a shot
	if(Input.GetKeyDown("space")){
		Instantiate(shot, Vector3(transform.position.x, transform.position.y, 5), Quaternion.identity);
		audio.PlayOneShot(ShotSound);
	}
}

function OnTriggerEnter(other : Collider){
	//make sure there are no ship - missile collisions after game has ended
	if(GameStateScript.state == GameState.GamePlay){
		//if a shot hits us
		if(other.tag == "ashot"){	
			//play the explosion sound
			audio.PlayOneShot(DeathSound);
		
			//set the deathtimer
			deathtimer = 10.0;
			GameStateScript.state = GameState.Dying;
			
			//no lives remaining
			if(scoring.lives == 0){
				//destroy the ship and the shot
				Destroy(other.gameObject);
				GameStateScript.state = GameState.GameOver;
			} else {
				//decrement the lives
				scoring.lives--;
			}
		}	
	}
}