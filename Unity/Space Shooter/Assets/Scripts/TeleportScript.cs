using UnityEngine;
using System.Collections;

public class TeleportScript : MonoBehaviour {

	public float MinX;
	public float MaxX;
	public float MinY;
	public float MaxY;

	void Start(){
		MinX = -16;
		MaxX = 16;
		MinY = -7;
		MaxY = 7;
	}

	void Update () {
		//Get hte current X and Y locations
		float x = transform.position.x;
		float y = transform.position.y;

		//Update X or Y if we've gone off screen
		if(x < MinX){
			x = MaxX;
		} else if(x > MaxX){
			x = MinX;
		}
		if(y < MinY){
			y = MaxY;
		} else if(y > MaxY){
			y = MinY;
		}

		//Update the position
		transform.position = new Vector2(x, y);
	}
}
