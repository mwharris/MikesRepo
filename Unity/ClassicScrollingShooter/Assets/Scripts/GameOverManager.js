#pragma strict
import UnityEngine.UI;

//Reference to the animator component.
private var anim : Animator;
//Timer to count up to restarting the level
private var restartTimer : float;

//Victory tone when the game is over
public var gameVictory : AudioClip;
public var gameVictory2 : AudioClip;
private var victorySoundPlayed : boolean;
private var victorySoundPlayed2 : boolean;
private var victorySoundTimer : float = 0.0;
private var victory2Volume : float = 0.0;

//Failure tone when the game is over
public var gameFailure : AudioClip;
public var gameFailure2 : AudioClip;
private var failureSoundPlayed : boolean;
private var failureSoundPlayed2 : boolean;
private var failureSoundTimer : float = 0.0;
private var failureVolume : float = 0.0;

//reference the scrollingship's script
var shipScript : GameObject;

//reference to the respawn panel
public var respawnPanel : GameObject;

//reference to the camera
public var mainCamera : GameObject;

function Awake () {
    //Set up the reference.
    anim = GetComponent (Animator);
    victorySoundPlayed = false;
    victorySoundPlayed2 = false;
    failureSoundPlayed = false;
}

function Update (){
	//If the player has run out of lives
    if(GameStateScript.state == GameState.GameOver){
        //tell the animator the game is over.
        anim.SetTrigger ("GameOver");
                
 		//stop the current game music
 		mainCamera.GetComponent.<AudioSource>().Stop();
 		
 		//play the game over sound
 		if(failureSoundPlayed == false){
 			failureSoundPlayed = true;
 			mainCamera.GetComponent.<AudioSource>().PlayClipAtPoint(gameFailure, transform.position);
 			
 			//start a timer to fade in the menu music
 			failureSoundTimer = 5;
 		}
 		
 		//play the menu music once the first sound has stopped
 		if(failureSoundTimer < 0 && failureVolume < 1.0 && failureSoundPlayed == true){
 			//start fading in the music
 			failureVolume += 0.5 * Time.deltaTime;
 			GetComponent.<AudioSource>().volume = failureVolume;
 			
 			//play the menu music
 			if(failureSoundPlayed2 == false){
 				failureSoundPlayed2 = true;
 				GetComponent.<AudioSource>().clip = gameFailure2;
 				GetComponent.<AudioSource>().Play();
 			}
 		} else {
 			failureSoundTimer -= Time.deltaTime;
 		}
    } 
    //If the player has reached the end of the game
    else if(GameStateScript.state == GameState.Finished){			
    	//tell the animator the player finished.
    	anim.SetTrigger ("GameFinished");
        
 		//stop the current game music
 		mainCamera.GetComponent.<AudioSource>().Stop();
 		
 		//play the game over sound
 		if(victorySoundPlayed == false){
 			victorySoundPlayed = true;
 			mainCamera.GetComponent.<AudioSource>().PlayClipAtPoint(gameVictory, transform.position);
 			
 			//start a timer to fade in the menu music
 			victorySoundTimer = 3;
 		}
 		
 		//play the menu music once the first sound has stopped
 		if(victorySoundTimer < 0 && victory2Volume < 1.0 && victorySoundPlayed == true){
 			//start fading in the music
 			victory2Volume += 0.5 * Time.deltaTime;
 			GetComponent.<AudioSource>().volume = victory2Volume;
 			
 			//play the menu music
 			if(victorySoundPlayed2 == false){
 				victorySoundPlayed2 = true;
 				GetComponent.<AudioSource>().clip = gameVictory2;
 				GetComponent.<AudioSource>().Play();
 			}
 		} else {
 			victorySoundTimer -= Time.deltaTime;
 		}
    }
    
    //If the player has died but lives remain
    if(GameStateScript.state == GameState.Dying){
    	//show the respawn indicator
    	respawnPanel.SetActive(true);
    } else {
    	respawnPanel.SetActive(false);
    }
}

function Restart(){	
	Reinitialize();
	
	//Reload the current scene to restart the game
	Application.LoadLevel(Application.loadedLevel);
}

function MainMenu(){
	//Load the Splash Screen scene
	Application.LoadLevel("SplashScreen");
}

function Exit(){
    #if UNITY_EDITOR 
    //stop playing the application if we are running through the editor
    EditorApplication.isPlaying = false;
    #else 
    //close the entire application if this is a standalone game
    Application.Quit();
    #endif
}

function ReplayFromCheckpoint(){
	//tell the animator the game is replaying.
	anim.ResetTrigger('GameOver');
	anim.SetTrigger('GameReplay');
	anim.SetTrigger('GameRestart');
	
	//reinitialize some game over variables
	Reinitialize();
	
	//reset the lives count and score
	scoring.lives = 3;
	scoring.score = 0;
	
 	//stop the menu music and play the game music
 	GetComponent.<AudioSource>().Stop();
 	mainCamera.GetComponent.<AudioSource>().Play();
	
	//call a method in scrollingship to handle the death
	shipScript.GetComponent(scrollingship).deathTimer = 0;
	shipScript.GetComponent(scrollingship).handleShipDeath(mainCamera);
}

function Reinitialize(){
 	//reinitialize some game over variables
	failureSoundPlayed = false;
	failureSoundPlayed2 = false;
	victorySoundPlayed = false;
	victorySoundPlayed2 = false;
	victory2Volume = 0;
	failureVolume = 0;
}