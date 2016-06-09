using UnityEngine;
using System.Collections;

public class RandomSpawner: MonoBehaviour {

	public GameObject asteroidA;
	public GameObject asteroidB;
	public GameObject asteroidC;
	public GameObject asteroidD;

	private GameObject objToDupe;
	private int asteroidCount = 0;
	private int frameCount = 0;

	public GameObject playerOne;
	public GameObject playerTwo;

	void Update() {
		//Only spawn an asteroid every couple of frames
		if(frameCount == 60){
			//Randomize the asteroid type to spawn
			int asteroidType = Random.Range(1, 5);
			if(asteroidType == 1){
				objToDupe = asteroidA;
			} else if(asteroidType == 2){
				objToDupe = asteroidB;
			} else if(asteroidType == 3){
				objToDupe = asteroidC;
			} else {
				objToDupe = asteroidD;
			}

			//Clone the given asteroid
			GameObject clone = Instantiate(objToDupe);
			clone.transform.position = Vector3.zero;

			/*
			//Determine the location of this asteroid
			float randomX = Random.Range(-15f, 15f);
			float randomY = Random.Range(-7f, 7f);
			//Set the location
			Vector2 location = new Vector2(randomX, randomY);
			clone.transform.position = location;
			*/

			bool good = false;
			while(!good){
				//Get a random location of the screen
				float randomX = Random.Range(-15f, 15f);
				float randomY = Random.Range(-7f, 7f);
				//Make sure we didn't spawn on top of the the center
				if((randomX <= 5 && randomX >= -5) && (randomY <= 5 && randomY >= -5)){
					continue;
				}
				//Make sure we didn't spawn on top of playerOne
				else if((randomX <= playerOne.transform.position.x + 5 && randomX >= playerOne.transform.position.x - 5) 
					&& (randomY <= playerOne.transform.position.y + 5 && randomY >= playerOne.transform.position.x - 5)){
					continue;
				}
				//Make sure we didn't spawn on top of playerOne
				else if((randomX <= playerTwo.transform.position.x + 5 && randomX >= playerTwo.transform.position.x - 5) 
					&& (randomY <= playerTwo.transform.position.y + 5 && randomY >= playerTwo.transform.position.x - 5)){
					continue;
				}
				else {
					//This location is good to spawn the asteroid
					good = true;
				}
				
				//Set the location
				Vector2 location = new Vector2(randomX, randomY);
				clone.transform.position = location;
			}

			//Increment the asteroid count
			asteroidCount++;

			//Reset the frame count
			frameCount = 0;
		} else {
			//Increment the frame count
			frameCount++;
		}
	}
}
