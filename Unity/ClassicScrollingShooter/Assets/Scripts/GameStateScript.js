#pragma strict

static var state : int;

public enum GameState {
	PressStart = 1,
	GamePlay = 2,
	GameOver = 3,
	Dying = 4,
	Respawning = 5
}

function Start () {
	state = GameState.GamePlay;
}

function Update () {

}