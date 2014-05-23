#pragma strict

function Start () {

}

function OnTriggerEnter (other : Collider) {
	if(GameStateScript.state == GameState.GamePlay){
		//if an alien shot hits us
		if(other.tag == "ashot"){	
			//destroy the shot
			Destroy(other.gameObject);
		}
		//if a player shot hits us
		else if(other.tag == "shot"){
			//destroy the shot
			Destroy(other.gameObject);
		}
	}
}