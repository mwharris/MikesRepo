#pragma strict
import UnityEngine.UI;

private var canvas : Canvas;
private var buttonText : GameObject;

function Start () {
	//set the canvas variable to the PausedCanvas
	canvas = GetComponent.<Canvas>();
	
	//disabled this canvas by default
	canvas.enabled = false;
}

function Update () {
	//only show the Pause menu if the game is being played
	if(GameStateScript.state == GameState.GamePlay || GameStateScript.state == GameState.Paused){
		//if Escape key is pressed
		if(Input.GetKeyDown(KeyCode.Escape)){
			//call a helper function to pause the game
			Pause();
		}
	}
}

function Pause(){
	//toggle the enabled/disabled canvas
	canvas.enabled = !canvas.enabled;
	
	//toggle the Game State between Paused/Playing
	if(GameStateScript.state == GameState.GamePlay){
		GameStateScript.state = GameState.Paused;
	} else if(GameStateScript.state == GameState.Paused){
		GameStateScript.state = GameState.GamePlay;
	}
	
	//flip the time scale to pause the game
	Time.timeScale = Time.timeScale == 0 ? 1 : 0;
}

function LoadSplashScene(){
	//flip the time scale to unpause the game
	Time.timeScale = Time.timeScale == 0 ? 1 : 0;
	
	//simply load the splash screen scene
	Application.LoadLevel('SplashScreen');
}

function Quit(){
    #if UNITY_EDITOR 
    //stop playing the application if we are running through the editor
    EditorApplication.isPlaying = false;
    #else 
    //close the entire application if this is a standalone game
    Application.Quit();
    #endif
}
