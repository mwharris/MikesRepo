#pragma strict

var scrollSpeed : float;

function Start () {

}

function Update () {
	if(scoring.level == 1 || scoring.level == 3){
		renderer.material.SetTextureOffset("_MainTex", Vector2(0, scrollSpeed * Time.time));
	} else {
		renderer.material.SetTextureOffset("_MainTex", Vector2(scrollSpeed * Time.time, 0));
	}
}