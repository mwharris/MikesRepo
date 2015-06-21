#pragma strict

public static var rocketsToRespawn = new Array();
public static var saucersToRespawn = new Array();
public static var basesToRespawn = new Array();

var rocket : GameObject;
var saucer : GameObject;
var base : GameObject;

function Update () {
	if(GameStateScript.state == GameState.Respawning){
		/*
		//loop through the rockets that were destroyed and respawn them
		for(var respawnLoc : RespawnLoc in rocketsToRespawn){
			var rocketX : float = respawnLoc.x;
			var rocketY : float = respawnLoc.y;
			var upsideDownRocket : boolean = respawnLoc.upsideDownRocket;
			
			//if the rocket is upside down then rotate it in the x axis
			if(upsideDownRocket == true){
				Instantiate(
					rocket,
					Vector3(
						rocketX,
						rocketY,
						0.0	
					),
					Quaternion.AngleAxis(270, Vector3.left)
				);
			} 
			//if not, apply a lesser rotation
			else {
				Instantiate(
					rocket,
					Vector3(
						rocketX,
						rocketY,
						0.0	
					),
					Quaternion.AngleAxis(90, Vector3.left)
				);
			}
		}
			
		//remove the score for the rockets that the player killed
		//scoring.score -= scoring.numRocketsKilled * scoring.rocketPoints;
		
		//reset the count
		//scoring.numRocketsKilled = 0;
		
		//loop through the saucers that were destroyed and respawn them
		for(var respawnLoc : RespawnLoc in saucersToRespawn){
			var saucerX : float = respawnLoc.x;;
			var saucerY : float = respawnLoc.y;
			
			Instantiate(
				saucer,
				Vector3(
					saucerX,
					saucerY,
					0.0	
				),
				Quaternion.AngleAxis(90, Vector3.left)
			);
			
			//remove the score for this saucer
			//scoring.score -= scoring.saucerPoints;
		}
		
		//loop through the bases that were destroyed and respawn them
		for(var respawnLoc : RespawnLoc in basesToRespawn){
			var baseX : float = respawnLoc.x;;
			var baseY : float = respawnLoc.y;
			
			Instantiate(
				base,
				Vector3(
					baseX,
					baseY,
					0.0	
				),
				Quaternion.AngleAxis(90, Vector3.left)
			);
			
			//remove the score for this base
			//scoring.score -= scoring.basePoints;
		}
		*/
		//reset the lists
		rocketsToRespawn = new Array();
		saucersToRespawn = new Array();
		basesToRespawn = new Array();
		
		//move the game state back to play mode
		GameStateScript.state = GameState.GamePlay;
	}
}