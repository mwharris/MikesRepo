using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;

[DisallowMultipleComponent]
public class GameRestarter : MonoBehaviour {
	void Update () {
		//Reload the level whenever a button is pressed after death
		if(Input.anyKeyDown){
			SceneManager.LoadScene("PigsFly");
		}
	}
}
