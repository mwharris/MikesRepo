#pragma strict

private var damageCounter : int;
private var level : int;

function Start(){
	damageCounter = 0;
	level = scoring.level;
}

function Update () {
	var size : Vector2;
	var offset : Vector2;
	
	if(damageCounter == 0){
		size = Vector2(0.2, 1);
		offset = Vector2(0, 0);
	} else if(damageCounter == 1){
		size = Vector2(0.2, 1);
		offset = Vector2(0.2, 0);
	} else if(damageCounter == 2){
		size = Vector2(0.2, 1);
		offset = Vector2(0.4, 0);
	} else if(damageCounter == 3){
		size = Vector2(0.2, 1);
		offset = Vector2(0.6, 0);
	} else if(damageCounter == 4){
		size = Vector2(0.2, 1);
		offset = Vector2(0.8, 0);
	}
		
	renderer.material.SetTextureScale("_MainTex", size);
	renderer.material.SetTextureOffset("_MainTex", offset);
	
	if(damageCounter > 4 || level != scoring.level){
		Destroy(gameObject);
	}
}

function OnTriggerEnter (other : Collider) {
	if(GameStateScript.state == GameState.GamePlay){
		//if an alien shot hits us
		if(other.tag == "ashot"){	
			//destroy the shot
			Destroy(other.gameObject);
			
			//increment damage
			damageCounter++;
		}
		//if a player shot hits us
		else if(other.tag == "shot"){
			//destroy the shot
			Destroy(other.gameObject);
			
			//increment damage
			damageCounter++;
		}
	}
}