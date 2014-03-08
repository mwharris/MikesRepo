#pragma strict

var shipSpeed : float;
var screenBoundary : float;
var shot : GameObject;
var alienfactoryvar : alienfactory;
var deathtimer : float;
var ShotSound : AudioClip;

function Start () {
	transform.position.y = -2.8;
}

function Update(){
	//if we are playing the game
	if(GameStateScript.state == GameState.GamePlay){
		//activate the ship controls
		ShipControl();
		
		//reset the level if no more aliens are left
		if(scoring.alienCounter == 0){
			GameStateScript.state = GameState.StartingPlay;
			scoring.level++;
		}
	}
	
	//if we are beginning to play the game
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
}

function ShipControl () {
	//move the ship left / right
	if(Input.GetKey("right")){
		transform.Translate(-shipSpeed * Time.deltaTime, 0, 0);
	}
	if(Input.GetKey("left")){
		transform.Translate(shipSpeed * Time.deltaTime, 0, 0);
	}
	
	//don't allow the ship to move too far left or right
	if(transform.position.x < -screenBoundary){
		transform.position.x = -screenBoundary;
	}
	if(transform.position.x > screenBoundary){
		transform.position.x = screenBoundary;
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
			//decrement the lives
			scoring.lives--;
			
			//set the deathtimer
			deathtimer = 10.0;
			GameStateScript.state = GameState.Dying;
			
			//no lives remaining
			if(scoring.lives == 0){
				//destroy the ship and the shot
				Destroy(other.gameObject);
				GameStateScript.state = GameState.GameOver;
			}
		}	
	}
}