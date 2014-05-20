#pragma strict

var shotSpeed : float;
var currentLevel : int;

function Start () {
	currentLevel = scoring.level;
}

function Update () {
	//fire the shot
	transform.Translate(0, shotSpeed * Time.deltaTime, 0);
	
	//animate the shot
	var index = Mathf.FloorToInt(Time.time * 12.0) % 4;
	var size = Vector2(0.25, 1);
	var offset = Vector2(index / 4.0, 0);
	renderer.material.SetTextureScale("_MainTex", size);
	renderer.material.SetTextureOffset("_MainTex", offset);
	
	//delete the shot once it reaches off screen
	//or if the level changes
	if(transform.position.y > 6.0 || currentLevel != scoring.level){
		Destroy(gameObject);
	}
}