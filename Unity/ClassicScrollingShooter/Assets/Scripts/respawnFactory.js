#pragma strict

function Update () {
	if(GameStateScript.state == GameState.Respawning){
		//move the game state back to play mode
		GameStateScript.state = GameState.GamePlay;
	}
}