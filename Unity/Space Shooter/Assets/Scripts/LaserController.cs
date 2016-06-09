using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class LaserController : MonoBehaviour {
	
	public Rigidbody2D rBody;
	public float TargetLife;

	private float life = 0;

	void Start () {
		//Fire the laser in it's Y-Axis
		rBody.AddRelativeForce(new Vector2(0, 1500));

		//Start our life timer
		life = TargetLife;
	}

	void Update(){
		life -= Time.deltaTime;

		if(life <= 0){
			Destroy(this.gameObject);
		}
	}

	void OnCollisionEnter2D (Collision2D c){
		//Destroy the laser if we hit something or if our timer is up
		if(c.gameObject.tag == "asteroid" || c.gameObject.tag == "wall"){
			Destroy(this.gameObject);
		}
	}
}
