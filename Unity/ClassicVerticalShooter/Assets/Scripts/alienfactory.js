#pragma strict

var alien : GameObject;
var ExploSound : AudioClip;

function Start () {
}

function MakeAliens(){
	var al : GameObject;
	
	//initialize the alien counter
	scoring.alienCounter = 0;
	
	//loop through and create a bunch of aliens
	for(var i = 0; i < 12; i++){
		for(var j = 0; j < 4; j++){
			//clone the alien GameObject and set it's position
			al = Instantiate(
				alien,
				Vector3((i - 5.5) * 0.7, j * 0.8, 5),
				Quaternion.identity
			);
			
			//initialize the state of the alien to 0 by 
			var alscript : alienscript;
			alscript = al.GetComponent(alienscript);
			alscript.state = 0;
			alscript.ExplosionSound = ExploSound;
			
			//increment the alien counter
			scoring.alienCounter++;
		}
	}
}

function Update () {

}