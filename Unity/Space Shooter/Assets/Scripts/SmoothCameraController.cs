using UnityEngine;
using System.Collections;

public class SmoothCameraController : MonoBehaviour {
	public Transform shipTransform;

	void Update () {
		//Follow the ship with the camera
		Vector3 idealTargetPosition = new Vector3(shipTransform.position.x, shipTransform.position.y, -5f);
		//Interpolate between the ideal position and the current position
		Vector3 currPos = Vector3.Lerp(this.transform.position, idealTargetPosition, 0.2f);
		//Apply the result of the Lerp
		this.transform.position = currPos;
	}
}
