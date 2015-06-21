#pragma strict

//Reference to the animator component.
private var anim : Animator;
//Timer to count up to restarting the level
private var restartTimer : float;

public var respawnPanel : GameObject;

function Awake () {
    //Set up the reference.
    anim = GetComponent (Animator);
}


function Update (){
    //If the player has run out of lives...
    if(GameStateScript.state == GameState.GameOver){
        //tell the animator the game is over.
        anim.SetTrigger ("GameOver");
    } 
    //If the player has died but lives remain...
    if(GameStateScript.state == GameState.Dying){
    	respawnPanel.SetActive(true);
    } else {
    	respawnPanel.SetActive(false);
    }
}

function Restart(){
	//Reload the current level to restart the game
	Application.LoadLevel(Application.loadedLevel);
}

function MainMenu(){
	//Load the Splash Screen
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