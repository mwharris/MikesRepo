using UnityEngine;
using System.Collections;

public class HeroController : MonoBehaviour {
	public Rigidbody2D rBody;
	public Animator anim;
	public AudioSource jumpAudio;

	private Vector2 moveVec = new Vector2(10, 0);
	private Vector2 jumpVec = new Vector2(10, 180);

	void Start() {
		//Start the hero off moving quickly to the right
		rBody.velocity = moveVec;
	}

	void FixedUpdate () {
		if(Input.GetKey("space")){
			//Stop all y-velocity in order for a better jump (but keep moving along the x-axis)
			rBody.velocity = moveVec;
			//Launch the hero upwards
			rBody.AddForce(jumpVec);
			//Update the animator's state to jumping
			anim.SetBool("Jumping", true);
			//Play a sound when we jump
			jumpAudio.Play();
		} else {
			//Update the animator's state to idle
			anim.SetBool("Jumping", false);
		}
	}
}
