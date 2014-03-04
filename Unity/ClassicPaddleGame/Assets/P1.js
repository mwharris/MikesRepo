#pragma strict

function Update () {
	var upper : GameObject;
	var lower : GameObject;
	
	upper = GameObject.Find("BoundaryUpper");
	lower = GameObject.Find("BoundaryLower");
	
	//move the paddle up if "W" is pressed
	if(Input.GetKey("w")){
		//if we moved too far up, reset
		if((transform.position.y + 2 + 1) >= upper.transform.position.y){
			//2 = the height of the paddle, 1 = the height of the boundary
			transform.position.y = upper.transform.position.y - 2 - 1;
		}
		//else, move the paddle
		else {
			transform.Translate(0, 20 * Time.deltaTime, 0);
		}
	}
	
	//move the paddle down if "S" is pressed
	if(Input.GetKey("s")){
		//if we moved too far down, reset
		if((transform.position.y - 2 - 1) <= lower.transform.position.y){
			//2 = the height of the paddle, 1 = the height of the boundary
			transform.position.y = lower.transform.position.y + 2 + 1;
		}
		//else, move the paddle
		else {
			transform.Translate(0, -20 * Time.deltaTime, 0);
		}
	}
}