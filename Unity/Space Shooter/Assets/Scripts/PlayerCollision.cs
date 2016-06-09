using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class PlayerCollision : MonoBehaviour {

	//The current sprite renderer
	public SpriteRenderer sRenderer;
	//Scripts
	public PlayerController playerScript;
	public ShotController shotScript;
	//Audio Source for when we die
	public AudioSource deathSource;
	//Particle System when we die
	public GameObject boom;

	void OnCollisionEnter2D (Collision2D c){
		CameraShake.shakeDuration = 0.5f;
		//Only die when we hit an asteroid
		if(c.gameObject.tag == "asteroid" || HitByOpponent(c)){
			//Decrease the number of lives for the player that was killed
			if(playerScript.playerNum == 1){
				ScoreController.p1Lives--;
				CollisionController.playerOneDead = true;

				if(c.gameObject.tag == "asteroid"){
					if(ScoreController.p1Score < 5){
						ScoreController.p1Score = 0;
					} else {
						ScoreController.p1Score -= 5;
					}
				} else {
					ScoreController.p2Score += 5;
					if(ScoreController.p1Score < 5){
						ScoreController.p1Score = 0;
					} else {
						ScoreController.p1Score -= 5;
					}
				}
			} else if (playerScript.playerNum == 2){
				ScoreController.p2Lives--;
				CollisionController.playerTwoDead = true;

				if(c.gameObject.tag == "asteroid"){
					if(ScoreController.p2Score < 5){
						ScoreController.p2Score = 0;
					} else {
						ScoreController.p2Score -= 5;
					}
				} else {
					ScoreController.p1Score += 5;
					if(ScoreController.p2Score < 5){
						ScoreController.p2Score = 0;
					} else {
						ScoreController.p2Score -= 5;
					}
				}
			}

			//Create an explosion if we hit something
			if(sRenderer){
				boom.transform.position = this.transform.position;
				GameObject particles = Instantiate(boom);
			}

			//Play a crash sound
			deathSource.Play();

			//Remove the PlayerController from the player to keep it from moving more
			Destroy(this.gameObject);
		}
	}

	bool HitByOpponent(Collision2D c){
		if(playerScript.playerNum == 1 && c.gameObject.layer == 11){
			return true;
		}
		if(playerScript.playerNum == 2 && c.gameObject.layer == 8){
			return true;
		}

		return false;
	}
}
