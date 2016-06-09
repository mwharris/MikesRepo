using UnityEngine;
using System.Collections;

public class WallCollision : MonoBehaviour {

	public AudioSource hitSource;
	public Rigidbody2D rBody;

	void OnCollisionEnter2D(Collision2D c){
		if(c.gameObject.layer == 8 || c.gameObject.layer == 11){
			//Play the sound of something hitting the wall
			hitSource.Play();
			//Destory the laser that hit us
			Destroy(c.gameObject);
		}
	}
}
