#pragma strict

var aShot : GameObject;

function Start () {

}

function Update () {
	//simple animation
	var index = Mathf.FloorToInt(Time.time * 12.0) % 4;
	var size = Vector2(0.25, 1);
	var offset = Vector2(index / 4.0, 0);
	renderer.material.SetTextureScale("_MainTex", size);
	renderer.material.SetTextureOffset("_MainTex", offset);
	
	//have the alien shoot occasionally
	if(Mathf.FloorToInt(Random.value * 10000.0) % 2000 == 0){
		Instantiate(
			aShot,
			Vector3(transform.position.x, transform.position.y, 5),
			Quaternion.identity
		);
	}
}

function OnTriggerEnter(other : Collider){
	if(other.tag == "shot"){
		//increment the score
		scoring.score += 10;
	
		Destroy(gameObject);
		Destroy(other.gameObject);
	}
}