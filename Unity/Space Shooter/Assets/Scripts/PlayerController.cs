using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {

	public int playerNum;
	public Rigidbody2D rBody;
	public ParticleSystem thrusters;
	public AudioSource shotSource;
	public AudioSource jetSource;

	private Vector2 move = new Vector2(0f, 5f);

	private KeyCode up;
	private KeyCode left;
	private KeyCode right;

	void Start(){
		if(playerNum == 1){
			up = KeyCode.W;
			left = KeyCode.A;
			right = KeyCode.D;
		} else {
			up = KeyCode.Keypad8;
			left = KeyCode.Keypad4;
			right = KeyCode.Keypad6;
		}
	}

	void Update () {
		//Move in the direction the ship is facing
		if(Input.GetKey(up)){
			//Push the ship in the direction it's facing
			rBody.AddForce(10f * this.transform.up);
			//Play a jet noise
			jetSource.Play();
			//Emit the jets from the back of the ship
			thrusters.Emit(80);
		}
			
		//Rotate the ship
		if(Input.GetKey(right)){
			rBody.transform.Rotate(new Vector3(0, 0, -3));
			//rBody.AddTorque(-0.1f);
		}
		if(Input.GetKey(left)){
			rBody.transform.Rotate(new Vector3(0, 0, 3));
			//rBody.AddTorque(0.1f);
		}
	}
}
