#pragma strict

var barrier : GameObject;
private var barrier1X : float;
private var barrier2X : float;
private var barrier3X : float;
private var barrierY : float;
private var barrierZ : float;

function Start () {
	//all barriers have the same Y and Z location
	barrierY = -1.7;
	barrierZ = 5;

	//different X locations left, middle, right
	barrier1X = -3;
	barrier2X = 0;
	barrier3X = 3;
}

function MakeBarriers () {
	var barr : GameObject;
	
	//create the 3 barriers
	//barrier 1
	barr = Instantiate(
		barrier,
		Vector3(barrier1X, barrierY, barrierZ),
		Quaternion.identity
	);
	
	//barrier 2
	barr = Instantiate(
		barrier,
		Vector3(barrier2X, barrierY, barrierZ),
		Quaternion.identity
	);
	
	//barrier 3
	barr = Instantiate(
		barrier,
		Vector3(barrier3X, barrierY, barrierZ),
		Quaternion.identity
	);
}