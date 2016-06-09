using UnityEngine;
using System.Collections;

public class ShotController : MonoBehaviour {

	public AudioSource shotSource;
	public GameObject laser;
	public int playerNum;

	private KeyCode shoot;
	private KeyCode altShoot;

	void Start(){
		if(playerNum == 1){
			shoot = KeyCode.Space;
			altShoot = KeyCode.Tab;
		} else {
			shoot = KeyCode.Return;
			altShoot = KeyCode.KeypadEnter;
		}
	}

	void Update() {
		//Fire a shot
		if(Input.GetKeyDown(shoot) || Input.GetKeyDown(altShoot)){
			//Dont allow the player to shoot while at position 0,0
			if(this.transform.position.x == 0 && this.transform.position.y == 0){
				return;
			} else {
				//Play the laser sound
				shotSource.Play();
				//Spawn a laser at the same position as the ship
				GameObject laserClone = Instantiate(laser);
				laserClone.transform.position = this.transform.position;
				laserClone.transform.rotation = this.transform.rotation;

			}
		}
	}
}
