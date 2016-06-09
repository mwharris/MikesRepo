using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections;

public class GameRestarter : MonoBehaviour {
	void Update () {
		//Restart the game when the player pushes any button
		if(Input.GetKey("escape")){
			SceneManager.LoadScene(0);
		} else if(Input.anyKeyDown){
			SceneManager.LoadScene(1);
		}
	}
}
