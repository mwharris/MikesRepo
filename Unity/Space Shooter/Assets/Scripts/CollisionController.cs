using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System.Collections;

public class CollisionController : MonoBehaviour {

	//Prefabs to the player ships
	public GameObject playerOne;
	public GameObject playerTwo;
	//Static vars used by PlayerCollision script to identify player death
	public static bool playerOneDead;
	public static bool playerTwoDead;
	//Text GameObjects to activate on game over
	public Text deathText;
	public Text restartText;
	public Text restartTextOther;
	//Sound for when a player dies
	public AudioSource deathSource;

	void Start(){
		playerOneDead = false;
		playerTwoDead = false;
	}

	void Update () {
		//Respawn the player on death if they still have lives
		if(playerOneDead && ScoreController.p1Lives >= 1){
			playerOneDead = false;
			Instantiate(playerOne, new Vector3(0f, 0f, 0f), new Quaternion());
			deathSource.Play();
		} else if(playerTwoDead && ScoreController.p2Lives >= 1){
			playerTwoDead = false;
			Instantiate(playerTwo, new Vector3(0f, 0f, 0f), new Quaternion());
			deathSource.Play();
		}

		//If either player has no lives left then end the game
		if(ScoreController.p1Lives <= 0 || ScoreController.p2Lives <= 0){
			//Show the game over screen
			if(deathText != null && restartText != null && restartTextOther != null){
				//Change the text of the game over screen depending on the winner
				if(ScoreController.p1Score > ScoreController.p2Score){
					deathText.text = "PLAYER 1 HAS WON!";
					deathText.color = Color.green;
				} else if(ScoreController.p1Score < ScoreController.p2Score){
					deathText.text = "PLAYER 2 HAS WON!";
					deathText.color = Color.blue;
				} else if(ScoreController.p1Score == ScoreController.p2Score){
					deathText.text = "DRAW!";
					deathText.color = Color.gray;
				}
				//Show the game over screen
				deathText.gameObject.SetActive(true);
				restartText.gameObject.SetActive(true);
				restartTextOther.gameObject.SetActive(true);
			}

			//Restart the game when the player pushes any button
			if(Input.GetKey("escape")){
				SceneManager.LoadScene(0);
			} else if(Input.GetKey(KeyCode.R)){
				SceneManager.LoadScene(1);
			}
		}
	}
}
