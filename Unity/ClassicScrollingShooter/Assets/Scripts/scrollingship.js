#pragma strict

public var shotPrefab : GameObject;
public var bombPrefab : GameObject;
public var shotSound : AudioClip;
public var bombSound : AudioClip;
public var shipExplosionSound : AudioClip;
public var shipExplosion : GameObject;
public var shipXLoc : int;
public var shipYLoc : int;
public static var deathTimer = 100;
public var shotFireRate : float;
public var bombFireRate : float;
public static var bombCounter = 0;

private var shotTimer = 0;
private var bombTimer = 0;
private var mostRecentCheckpoint = 1;
private final var checkpoint1XLoc = 22;
private final var checkpoint1YLoc = 1;
private final var checkpoint2XLoc = -2;
private final var checkpoint2YLoc = 0.7;
private final var checkpoint3XLoc = -25;
private final var checkpoint3YLoc = 1.5;

function OnGUI(){
	GUI.Box(Rect(10, 90, 120, 30), "Loc: " + transform.position.x);
	
	var leftBound : GameObject = GameObject.Find("LeftBound");
	var rightBound : GameObject = GameObject.Find("RightBound");
	var leftX : float = leftBound.transform.position.x;
	var rightX : float = rightBound.transform.position.x;
	
	//GUI.Box(Rect(10, 130, 120, 30), "Bombs: " + bombCounter);
	//GUI.Box(Rect(10, 130, 120, 30), "LeftB: " + leftX);
	//GUI.Box(Rect(10, 170, 120, 30), "RightB: " + rightX);
}

function Update () {	
	//store the current x and y location
	shipXLoc = transform.position.x;
	shipYLoc = transform.position.y;
	
	//get a handle to the camera object
	var camera : GameObject = GameObject.Find("Main Camera");
		
	//only handle input if the game is running and the ship is alive
	if(GameStateScript.state == GameState.GamePlay){
		handleShipInputs(camera);
		
		//update the checkpoint if we reached it
		if(transform.position.x < checkpoint2XLoc){
			mostRecentCheckpoint = 2;
		} else if( transform.position.x < checkpoint3XLoc){
			mostRecentCheckpoint = 3;
		}
	} 
	//if the ship is dead
	else if(GameStateScript.state == GameState.Dying){
		handleShipDeath(camera);
	}
}

function handleShipDeath(camera : GameObject){
	//decrement the death timer timer to count down to respawn
	deathTimer -= 0.1;
	
	//reset the bomb counter
	//bombCounter = 0;
	
	//if the death time has run out
	if(deathTimer <= 0){
		//move the ship to the most recent checkpoint
		if(mostRecentCheckpoint == 1){
			transform.position.x = checkpoint1XLoc;
			transform.position.y = checkpoint1YLoc;
		} else if(mostRecentCheckpoint == 2){
			transform.position.x = checkpoint2XLoc;
			transform.position.y = checkpoint2YLoc;
		} else if(mostRecentCheckpoint == 3){
		
		}
		
		//move the camera to the same location as the ship
		camera.transform.position.x = transform.position.x - 0.7;
		camera.transform.position.y = transform.position.y;
		
		//enable the renderer
		renderer.enabled = true;
		transform.GetChild(0).renderer.enabled = true;
		
		//set the game state to respawning
		GameStateScript.state = GameState.Respawning;
	} else {
		//disable the renderer for the ship and the jets
		renderer.enabled = false;
		transform.GetChild(0).renderer.enabled = false;
	}
}

function handleShipInputs(camera : GameObject){
	var leftBound : GameObject = GameObject.Find("LeftBound");
	var rightBound : GameObject = GameObject.Find("RightBound");
	
	//get the camera's x and y position
	var leftX : float = leftBound.transform.position.x;
	var rightX : float = rightBound.transform.position.x;
	var yPos : float = camera.transform.position.y;

	//controls for moving the ship up and down
	if(transform.position.y < 2.3 && Input.GetKey("w")){
		transform.Translate(0, 0, 0.8 * Time.deltaTime);
	}
	if(Input.GetKey("s")){
		transform.Translate(0, 0, -0.8 * Time.deltaTime);
	}
	if(Input.GetKey("a") && transform.position.x < leftX){
		transform.Translate(0.8 * Time.deltaTime, 0, 0);
	}
	if(Input.GetKey("d") && transform.position.x > rightX){
		transform.Translate(-0.8 * Time.deltaTime, 0, 0);
	}
	
	//constantly move the ship right
	transform.Translate(-0.3 * Time.deltaTime, 0, 0);
	
	//controls for firing shots and bombs
	//allow the player to hold the keys down to fire
	if(Input.GetKey("space") && shotTimer <= 0){
		//play the shot sound
		audio.PlayOneShot(shotSound);
	
		//create a bullet and shoot it
		Instantiate(
			shotPrefab, 
			Vector3(transform.position.x, transform.position.y, 0.0),
			Quaternion.AngleAxis(90, Vector3.forward)
		);
		
		//start a timer to stagger the shot fire rate
		shotTimer = shotFireRate;
	} 
	
	//get the number of bombs on the screen
	var bombs : GameObject[];
	bombs = GameObject.FindGameObjectsWithTag("bomb");
	
	//controls for firing bombs
	//allow the player to hold the keys down to fire
	//but only allow 2 bombs on screen at a time
	if(Input.GetKey("b") && bombTimer <= 0 && bombs.length < 2){
		//play the shot sound
		audio.PlayOneShot(bombSound);
	
		//create a bullet and shoot it
		Instantiate(
			bombPrefab, 
			transform.position,
			bombPrefab.transform.rotation
		);
		
		//start a timer to stager the bomb fire rate
		bombTimer = bombFireRate;
		
		//increase the bomb counter
		//bombCounter += 1;
	}
	
	//decrement the fire rate timers
	if(shotTimer > 0) {
		shotTimer -= Time.deltaTime;
	}
	if(bombTimer > 0) {
		bombTimer -= Time.deltaTime;
	}
}

function OnTriggerEnter(other : Collider){
	//destroy the ship if we hit the terrain
	if(other.tag == "terrain"){
		audio.PlayClipAtPoint(shipExplosionSound, transform.position);
		
		//show the explosion
		Instantiate(shipExplosion, transform.position, transform.rotation);

		//start the death timer
		deathTimer = 100;
						
		//determine the next game state
		scoring.lives--;
		if(scoring.lives <= 0){
			GameStateScript.state = GameState.GameOver;
		} else {
			GameStateScript.state = GameState.Dying;
		}
	}
	
	//destroy the ship if a rocket hit us
	if(other.tag == "rocket"){
		audio.PlayClipAtPoint(shipExplosionSound, transform.position);
		
		//show the explosion
		Instantiate(shipExplosion, transform.position, transform.rotation);
	}
	
	//destroy the ship if we hit a saucer
	if(other.tag == "saucer"){
		audio.PlayClipAtPoint(shipExplosionSound, transform.position);
		
		//show the explosion
		Instantiate(shipExplosion, transform.position, transform.rotation);
	}
}