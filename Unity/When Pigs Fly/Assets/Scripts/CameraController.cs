using UnityEngine;
using System.Collections;

public class CameraController : MonoBehaviour {
	public Transform hero;

	//Simply keep the camera on the hero
	void Update () {
		this.transform.position = new Vector3(hero.position.x + 5, 0, -5); 
	}
}
