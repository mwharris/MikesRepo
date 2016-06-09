using UnityEngine;
using System.Collections;

public class CameraController : MonoBehaviour {
	public Transform shipTransform;

	void Update () {
		//Follow the ship with the camera
		//this.transform.position = new Vector3(shipTransform.position.x, shipTransform.position.y, -10);
	}
}
