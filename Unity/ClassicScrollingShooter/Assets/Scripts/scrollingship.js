#pragma strict

public var shotPrefab : GameObject;
public var bombPrefab : GameObject;
public var shipExplosion : GameObject;
public var shotSound : AudioClip;
public var bombSound : AudioClip;
public var shipExplosionSound : AudioClip;

public var shipXLoc : int;
public var shipYLoc : int;

public static var deathTimer : int;

public var shotFireRate : float;
public var bombFireRate : float;
private var shotTimer = 0;
private var bombTimer = 0;
private var lastShot : float = 0;
private var lastBomb : float = 0;
public static var bombCounter : int;

public var checkpointPanel : GameObject;
private var checkpointTimer  = 0;
private var mostRecentCheckpoint = 1;

public var cameraGameObject : GameObject;
public var leftBound : GameObject;
public var rightBound : GameObject;

//level one checkpoints
private final var checkpoint1XLoc = 22;
private final var checkpoint1YLoc = 1;
private final var checkpoint2XLoc = 13.75;
private final var checkpoint2YLoc = 1.45;
private final var checkpoint3XLoc = 7.8;
private final var checkpoint3YLoc = 1.9;

//level two checkpoints
private final var checkpoint4XLoc = -2;
private final var checkpoint4YLoc = 0.7;
private final var checkpoint5XLoc = -10;
private final var checkpoint5YLoc = 1;
private final var checkpoint6XLoc = -18.7;
private final var checkpoint6YLoc = 1;

//level three checkpoints
private final var checkpoint7XLoc = -25;
private final var checkpoint7YLoc = 1.5;
private final var checkpoint8XLoc = -31.6;
private final var checkpoint8YLoc = 1.5;
private final var checkpoint9XLoc = -38.4;
private final var checkpoint9YLoc = 1.53;

//level three checkpoints
private final var checkpoint10XLoc = -50;
private final var checkpoint10YLoc = 0.423;
private final var checkpoint11XLoc = -56.451;
private final var checkpoint11YLoc = 0.3912;
private final var checkpoint12XLoc = -59;
private final var checkpoint12YLoc = 0.385;
private final var checkpoint13XLoc = -63.7;
private final var checkpoint13YLoc = 0.385;
private final var checkpoint14XLoc = -69;
private final var checkpoint14YLoc = 2.25;

function Awake(){
	//don't show the checkpoint panel until a checkpoint has been reached
	checkpointPanel.SetActive(false);
	
	//initialize static variables
	deathTimer = 100;
	bombCounter = 0;
}

function Update () {	
	//store the current x and y location
	shipXLoc = transform.position.x;
	shipYLoc = transform.position.y;
		
	//only handle input if the game is running and the ship is alive
	if(GameStateScript.state == GameState.GamePlay){
		handleShipInputs(cameraGameObject);
		
		//update the checkpoint if we reached it
		if(transform.position.x < checkpoint2XLoc && mostRecentCheckpoint == 1){
			handleCheckpointReached();
		} else if( transform.position.x < checkpoint3XLoc && mostRecentCheckpoint == 2){
			handleCheckpointReached();
		} else if( transform.position.x < checkpoint4XLoc && mostRecentCheckpoint == 3){
			handleCheckpointReached();
		} else if( transform.position.x < checkpoint5XLoc && mostRecentCheckpoint == 4){
			handleCheckpointReached();
		} else if( transform.position.x < checkpoint6XLoc && mostRecentCheckpoint == 5){
			handleCheckpointReached();
		} else if( transform.position.x < checkpoint7XLoc && mostRecentCheckpoint == 6){
			handleCheckpointReached();
		} else if( transform.position.x < checkpoint8XLoc && mostRecentCheckpoint == 7){
			handleCheckpointReached();
		} else if( transform.position.x < checkpoint9XLoc && mostRecentCheckpoint == 8){
			handleCheckpointReached();
		} else if( transform.position.x < checkpoint10XLoc && mostRecentCheckpoint == 9){
			handleCheckpointReached();
		} else if( transform.position.x < checkpoint11XLoc && mostRecentCheckpoint == 10){
			handleCheckpointReached();
		} else if( transform.position.x < checkpoint12XLoc && mostRecentCheckpoint == 11){
			handleCheckpointReached();
		} else if( transform.position.x < checkpoint13XLoc && mostRecentCheckpoint == 12){
			handleCheckpointReached();
		} else if( transform.position.x < checkpoint14XLoc && mostRecentCheckpoint == 13){
			handleCheckpointReached();
		}
	} 
	//if the ship is dead call a method to handle it's death
	else if(GameStateScript.state == GameState.Dying){
		handleShipDeath(cameraGameObject);
	}
	
	//if the checkpoint reached popup is displayed
	if(checkpointPanel.activeSelf){
		//decrement the timer
		checkpointTimer -= Time.deltaTime;
		
		//if the timer has run out then close the popup
		if(checkpointTimer <= 0){
			checkpointTimer = 0;
			checkpointPanel.SetActive(false);
		}
	}
}

function handleCheckpointReached(){
	//increment the checkpoint counter
	mostRecentCheckpoint++;
	
	//show the checkpoint indicator and start the checkpoint timer
	checkpointPanel.SetActive(true);
	checkpointTimer = 600;
}

function handleShipDeath(camera : GameObject){
	//decrement the death timer to count down to respawn
	deathTimer -= 0.1;
	
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
			transform.position.x = checkpoint3XLoc;
			transform.position.y = checkpoint3YLoc;
		} else if(mostRecentCheckpoint == 4){
			transform.position.x = checkpoint4XLoc;
			transform.position.y = checkpoint4YLoc;
		} else if(mostRecentCheckpoint == 5){
			transform.position.x = checkpoint5XLoc;
			transform.position.y = checkpoint5YLoc;
		} else if(mostRecentCheckpoint == 6){
			transform.position.x = checkpoint6XLoc;
			transform.position.y = checkpoint6YLoc;
		} else if(mostRecentCheckpoint == 7){
			transform.position.x = checkpoint7XLoc;
			transform.position.y = checkpoint7YLoc;
		} else if(mostRecentCheckpoint == 8){
			transform.position.x = checkpoint8XLoc;
			transform.position.y = checkpoint8YLoc;
		} else if(mostRecentCheckpoint == 9){
			transform.position.x = checkpoint9XLoc;
			transform.position.y = checkpoint9YLoc;
		} else if(mostRecentCheckpoint == 10){
			transform.position.x = checkpoint10XLoc;
			transform.position.y = checkpoint10YLoc;
		} else if(mostRecentCheckpoint == 11){
			transform.position.x = checkpoint11XLoc;
			transform.position.y = checkpoint11YLoc;
		} else if(mostRecentCheckpoint == 12){
			transform.position.x = checkpoint12XLoc;
			transform.position.y = checkpoint12YLoc;
		} else if(mostRecentCheckpoint == 13){
			transform.position.x = checkpoint13XLoc;
			transform.position.y = checkpoint13YLoc;
		} else if(mostRecentCheckpoint == 14){
			transform.position.x = checkpoint14XLoc;
			transform.position.y = checkpoint14YLoc;
		}
						
		//move the camera to the same location as the ship
		camera.transform.position.x = transform.position.x - 0.7;
		camera.transform.position.y = transform.position.y;
		
		//enable the renderer
		GetComponent.<Renderer>().enabled = true;
		transform.GetChild(0).GetComponent.<Renderer>().enabled = true;
		
		//set the game state to respawning
		GameStateScript.state = GameState.Respawning;
	} else {
		//disable the renderer for the ship and the jets
		GetComponent.<Renderer>().enabled = false;
		transform.GetChild(0).GetComponent.<Renderer>().enabled = false;
	}
}

function handleShipInputs(camera : GameObject){	
	//get the camera's x and y position
	var leftX : float = leftBound.transform.position.x;
	var rightX : float = rightBound.transform.position.x;
	var yPos : float = camera.transform.position.y;

	//controls for moving the ship up and down
	if(Input.GetKey("w") && (transform.position.y < 2 || transform.position.x < -25)){
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
	
	//controls for firing shots
	//allow the player to hold the key down to fire
	if(Input.GetKey("space")){
		Fire();
	} 
	
	//get the number of bombs on the screen
	var bombs : GameObject[];
	bombs = GameObject.FindGameObjectsWithTag("bomb");
	
	//controls for firing bombs
	//allow the player to hold the key down to fire
	//but only allow 2 bombs on screen at a time
	if(Input.GetKey("b") && bombs.length < 2){
		DropBomb();
	}
}

function DropBomb(){
	if(Time.time > bombFireRate + lastBomb){
		//play the shot sound
		GetComponent.<AudioSource>().PlayOneShot(bombSound);

		//create a bullet and shoot it
		Instantiate(
			bombPrefab, 
			transform.position,
			bombPrefab.transform.rotation
		);
		
		//start a timer to stagger the bomb fire rate
		lastBomb = Time.time;
	}
}

function Fire() {
	if(Time.time > shotFireRate + lastShot){
		//play the shot sound
		GetComponent.<AudioSource>().PlayOneShot(shotSound);

		//create a bullet and shoot it
		Instantiate(
			shotPrefab, 
			Vector3(transform.position.x, transform.position.y, 0.0),
			Quaternion.AngleAxis(90, Vector3.forward)
		);
		
		//start a timer to stagger the shot fire rate
		lastShot = Time.time;
	}
}

function OnTriggerEnter(other : Collider){
	//destroy the ship if we hit the terrain
	if(other.tag == "terrain"){
		GetComponent.<AudioSource>().PlayClipAtPoint(shipExplosionSound, transform.position);
		
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
		GetComponent.<AudioSource>().PlayClipAtPoint(shipExplosionSound, transform.position);
		
		//show the explosion
		Instantiate(shipExplosion, transform.position, transform.rotation);
	}
	
	//destroy the ship if we hit a saucer
	if(other.tag == "saucer"){
		GetComponent.<AudioSource>().PlayClipAtPoint(shipExplosionSound, transform.position);
		
		//show the explosion
		Instantiate(shipExplosion, transform.position, transform.rotation);
	}
}