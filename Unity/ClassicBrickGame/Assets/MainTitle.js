#pragma strict

var BeepSound : AudioClip;
var backgroundTexture : Texture;

function OnGUI () {
	//draw the splash screen on the scene
	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), backgroundTexture);
	
	//if any key is pressed
	if(Input.anyKeyDown){
		//play a start noise
		audio.PlayOneShot(BeepSound);
		
		//display a message and load the next scene
		Debug.Log("A key or mouse click has been detected");
		Application.LoadLevel("BrickScene");
	}
}