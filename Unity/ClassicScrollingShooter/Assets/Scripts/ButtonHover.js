#pragma strict
import UnityEngine.UI;

private var buttonText : GameObject;
var buttonClick : AudioClip;
var buttonHover : AudioClip;
var onlyActiveOnGameOver : boolean;

function Start(){
	if(onlyActiveOnGameOver){
		var button : Selectable = gameObject.GetComponent.<Selectable>();
		button.interactable = false;
	}
}

function Update(){
	if(onlyActiveOnGameOver && GameStateScript.state == GameState.GameOver){
		var button : Selectable = gameObject.GetComponent.<Selectable>();
		button.interactable = true;
	}
}

function HoverButtonTextEnter(){
	//only do this action on buttons that don't appear on GameOver
	//unless the GameState is GameOver
	if(!onlyActiveOnGameOver || GameStateScript.state == GameState.GameOver){
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
	if(!onlyActiveOnGameOver || GameStateScript.state == GameState.GameOver){
		//change the color of the text on hover
		buttonText = transform.Find("Text").gameObject;
		var txt : Text = buttonText.GetComponent.<Text>();
		txt.color = Color.green;
	}
}

function ButtonClick(){
	//only do this action on buttons that don't appear on GameOver
	//unless the GameState is GameOver
	if(!onlyActiveOnGameOver || GameStateScript.state == GameState.GameOver){
		//play a sound when a button is clicked
		GetComponent.<AudioSource>().PlayOneShot(buttonClick);
		
		//make sure the text is reset to the green color
		HoverButtonTextExit();
	}
}