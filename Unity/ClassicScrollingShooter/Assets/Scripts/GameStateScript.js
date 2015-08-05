#pragma strict

static var state : int;

public enum GameState {
	PressStart = 1,
	GamePlay = 2,
	GameOver = 3,
	Dying = 4,
	Respawning = 5,
	Paused = 6,
	Finished = 7
}

function Awake(){
	state = GameState.GamePlay;
}