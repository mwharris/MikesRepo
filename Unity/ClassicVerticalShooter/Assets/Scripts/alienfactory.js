#pragma strict

var alien : GameObject;

function Start () {
	//call function to make aliens
	MakeAliens();
}

function MakeAliens(){
	var al : GameObject;
	
	//loop through and create a bunch of aliens
	for(var i = 0; i < 15; i++){
		for(var j = 0; j < 6; j++){
			//make a new alien
			al = Instantiate(
				alien,
				Vector3((i - 7) * 0.4, (j - 1) * 0.6, 5),
				Quaternion.identity
			);
		}
	}
}

function Update () {

}