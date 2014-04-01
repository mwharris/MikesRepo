#pragma strict

var alienLv1 : GameObject;
var alienLv2 : GameObject;
var alienLv3 : GameObject;
var alienLv4 : GameObject;
var alienLv5 : GameObject;
var motherShip : GameObject;
private var alienTextures : ArrayList;
var ExploSound : AudioClip;
static var alienDirection : int;

function Start () {
	//start the aliens off moving to the right
	alienDirection = 1;
	alienTextures = new ArrayList();
	alienTextures.Add(alienLv1); 
	alienTextures.Add(alienLv2); 
	alienTextures.Add(alienLv3); 
	alienTextures.Add(alienLv4); 
	alienTextures.Add(alienLv5); 
}

function MakeAliens(){
	var al : GameObject;
	
	//initialize the alien counter
	scoring.alienCounter = 0;
	
	//loop through and create a bunch of aliens
	for(var i = 0; i < 11; i++){
		for(var j = 0; j < 5; j++){
			//clone the alien GameObject and set it's position
			al = Instantiate(
				alienTextures[j],
				Vector3((i - 5.5) * 0.6, j * 0.6, 5),
				Quaternion.identity
			);
			
			//initialize the state of the alien to 0 by 
			var alscript : alienscript;
			alscript = al.GetComponent(alienscript);
			alscript.state = 0;
			alscript.ExplosionSound = ExploSound;
			alscript.alienType = j;
			
			//increment the alien counter
			scoring.alienCounter++;
		}
	}
	
	//now create the mothership
}

function Update () {

}