#pragma strict
import UnityEngine.UI;

private var buttonText : GameObject;
private var button : Selectable;
var buttonClick : AudioClip;
var buttonHover : AudioClip;
var onlyActiveOnGameOver : boolean;
var onlyActiveOnGameFinished : boolean;

function Start(){
	if(onlyActiveOnGameOver || onlyActiveOnGameFinished){
		//on game start, hide buttons that are only meant to
		//be shown on Game Over and Game Finished
		button = gameObject.GetComponent.<Selectable>();
		button.interactable = false;
	}
}

function Update(){
	if((onlyActiveOnGameOver && GameStateScript.state == GameState.GameOver) 
			|| (onlyActiveOnGameFinished && GameStateScript.state == GameState.Finished)){
		//set buttons to non-interactable to show them when 
		//in the correct Game State
		button = gameObject.GetComponent.<Selectable>();
		button.interactable = true;
	} else if((onlyActiveOnGameOver && GameStateScript.state != GameState.GameOver)
			|| (onlyActiveOnGameFinished && GameStateScript.state != GameState.Finished)){
		//set buttons to non-interactable to hide them when 
		//not in the correct Game State
		button = gameObject.GetComponent.<Selectable>();
		button.interactable = false;
	}
}

function HoverButtonTextEnter(){
	//only do this action on buttons that don't appear on GameOver
	//unless the GameState is GameOver
	if(!onlyActiveOnGameOver 
			|| (onlyActiveOnGameOver && GameStateScript.state == GameState.GameOver) 
			|| (onlyActiveOnGameFinished && GameStateScript.state == GameState.Finished)){
		//change the color of the text on hover
		buttonText = transform.Find("Text").gameObject;
		var txt : Text = buttonText.GetComponent.<Text>();
		txt.color = Color.white;
		
		//play a small noise when the button is hovered
		GetComponent.<AudioSource>().PlayOneShot(buttonHover);
	}
}

function HoverButtonTextExit(){
	//only do this action on buttons that don't appear on GameOver
	//unless the GameState is GameOver
	if(!onlyActiveOnGameOver 
			|| (onlyActiveOnGameOver && GameStateScript.state == GameState.GameOver) 
			|| (onlyActiveOnGameFinished && GameStateScript.state == GameState.Finished)){
		//change the color of the text on hover
		buttonText = transform.Find("Text").gameObject;
		var txt : Text = buttonText.GetComponent.<Text>();
		txt.color = Color.green;
	}
}

function ButtonClick(){
	//only do this action on buttons that don't appear on GameOver
	//unless the GameState is GameOver
	if(!onlyActiveOnGameOver 
			|| (onlyActiveOnGameOver && GameStateScript.state == GameState.GameOver) 
			|| (onlyActiveOnGameFinished && GameStateScript.state == GameState.Finished)){
		//play a sound when a button is clicked
		GetComponent.<AudioSource>().PlayOneShot(buttonClick);
		
		//make sure the text is reset to the green color
		HoverButtonTextExit();
	}
}