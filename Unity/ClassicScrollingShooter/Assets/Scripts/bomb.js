#pragma strict

private var bombSpeed : float = 1.0;
private var rotationTimer : float = 0.35;
public var bombExplo : AudioClip;

function Update () {
	//move the bomb forwards
	transform.Translate(0, 0, ((0.3 + bombSpeed) * Time.deltaTime));
	
	//slowly rotate the bomb downards
	rotationTimer -= Time.deltaTime;
	if(rotationTimer <= 0){
		if(transform.rotation.x < .47){
			transform.Rotate(3,0,0);
		} else {
			transform.rotation.x = 0.47;
		}
	}

	var player : GameObject = GameObject.Find("ScrollingShip");
	if(player && GameStateScript.state == GameState.GamePlay){
		if(player.transform.position.x - transform.position.x > 2.0){
			Destroy(gameObject);
		}
	}
}


function OnTriggerEnter(other : Collider){
	//destroy the shot if we hit the terrain
	if(other.tag == "terrain"){
		Destroy(gameObject);
		GetComponent.<AudioSource>().PlayClipAtPoint(bombExplo, transform.position);
	}
}