#pragma strict

static var state : int;

public enum GameState {
	PressStart = 1,
	StartingPlay = 2,
	GamePlay = 3,
	Dying = 4,
	GameOver = 5,
	NextLevel = 6
}

function Start () {
	state = GameState.PressStart;
}

function Update () {

}