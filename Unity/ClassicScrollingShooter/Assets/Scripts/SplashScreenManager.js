#pragma strict
import UnityEngine.UI;

private var canvas : Canvas;
var splashPanel : GameObject;
var controlsPanel : GameObject;
var loadingPanel : GameObject;
var buttonClick : AudioClip;

function Start () {
	//set the canvas variable to the SplashCanvas
	canvas = GetComponent.<Canvas>();
	
	//disable the controls menu and loading popup
	controlsPanel.SetActive(false);
	loadingPanel.SetActive(false);
}

function StartGame() {
	//play a button click noise
	GetComponent.<AudioSource>().PlayOneShot(buttonClick);
	
	//show the loading popup
	loadingPanel.SetActive(true);
	
	//load the scene for the game
	Application.LoadLevel('GameScene');
}

function ExitGame() {
	//play a button click noise
	GetComponent.<AudioSource>().PlayOneShot(buttonClick);
	
    #if UNITY_EDITOR 
    //stop playing the application if we are running through the editor
    EditorApplication.isPlaying = false;
    #else 
    //close the entire application if this is a standalone game
    Application.Quit();
    #endif
}

function ToggleControlsMenu() {
	//play a button click noise
	GetComponent.<AudioSource>().PlayOneShot(buttonClick);

	//toggle the splash screen and the controls screen
	splashPanel.SetActive(!splashPanel.activeSelf);
	controlsPanel.SetActive(!controlsPanel.activeSelf);
}
