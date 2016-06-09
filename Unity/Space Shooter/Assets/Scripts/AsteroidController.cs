using UnityEngine;
using System.Collections;

public class AsteroidController : MonoBehaviour {

	public Rigidbody2D rBody;

	//The next ateroid type to spawn upon death
	public GameObject nextAsteroid;

	//Explosion particle system to play on death
	public GameObject boom;
	//Audio source to play on death
	public AudioSource audio;
	//Clip to play on death
	public AudioClip noise;

	//The amount of smaller asteroids to spawn on hit
	private int smallAsteroidCount = 2;

	void Start () {
		//Create random spin / speed / direction
		rBody.AddForce(RandomizeForce());
		rBody.AddTorque(RandomizeTorque());
	}

	void OnCollisionEnter2D (Collision2D c){	
		//If this asteroid got hit by a laser
		if(c.gameObject.tag == "laser"){
			//Get a reference to the current position and rotation
			Vector2 currPos = this.transform.position;
			Quaternion currRot = this.transform.rotation;

			//Move this object out of viewing until we're ready to destroy
			transform.position = Vector3.one * 9999999f;

			//Play a noise
			audio.PlayOneShot(noise);

			//Create smaller asteroids if needed
			if(nextAsteroid != null){
				for(var i = 0; i < smallAsteroidCount; i++){
					GameObject newAsteroid = (GameObject) Instantiate(nextAsteroid, currPos, currRot); 
					//Make sure the asteroids don't spawn on top of each other
					if(i == 0){
						newAsteroid.transform.position = new Vector2(currPos.x + 1, currPos.y + 1);
					} else {
						newAsteroid.transform.position = new Vector2(currPos.x - 1, currPos.y - 1);
					}
					//Randomize spin and speed
					newAsteroid.GetComponent<Rigidbody2D>().AddForce(RandomizeForce());
					newAsteroid.GetComponent<Rigidbody2D>().AddTorque(RandomizeTorque());
				}
			}

			//Clone the explosion particles at this location
			boom.transform.position = currPos;
			GameObject particles = Instantiate(boom);

			//Destroy this asteroid after the noise is done playing
			Destroy(this.gameObject, noise.length);

			//Increment score
			if(c.gameObject.layer == 8){
				ScoreController.p1Score++;
			} else {
				ScoreController.p2Score++;
			}
		}		
	}

	//Create a Vector2 with randomized direction and magnitude of force
	Vector2 RandomizeForce(){
		float randomX = Random.Range(-50f, 50f);
		float randomY = Random.Range(-50f, 50f);
		return new Vector2(randomX, randomY);
	}

	//Randomize a torque value for the asteroid
	float RandomizeTorque(){
		return Random.Range(-10f, 10f);
	}
}
