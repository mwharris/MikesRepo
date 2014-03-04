#pragma strict

//Method to control player 2's AI slogic
function Update () {
	if(Menu.gameStart == true){
		//activate the AI logic if we are playing single player
		if(SinglePlayer.singePlayer){
			var ball : GameObject;
			var paddle : GameObject;
			var distance : int;
		
			//get the ball object
			ball = GameObject.Find("Ball");
			
			//get the paddle object
			paddle = GameObject.Find("PaddleRight");
			
			//determine the distance between the Y of ball and Y of paddle
			distance = ball.transform.position.y - paddle.transform.position.y;
			
			//if the ball is on our side of the screen
			if(ball.transform.position.x > 0){
				//if the ball is below the paddle
				if((ball.transform.position.y + 2) < paddle.transform.position.y){
					//move down
					transform.Translate(0, -20 * Time.deltaTime, 0);
				}
				//if the ball is above the paddle
				else if((ball.transform.position.y - 2) > paddle.transform.position.y){
					//move up
					transform.Translate(0, 20 * Time.deltaTime, 0);
				}
			} 
			//if the ball is on the other side of the screen
			else {
				//just move back towards the middle
				if(paddle.transform.position.y > 2){
					transform.Translate(0, -20 * Time.deltaTime, 0);
				} else if(paddle.transform.position.y < -2){
					transform.Translate(0, 20 * Time.deltaTime, 0);
				}
			} 
		} 
		//activate the multi player logic if we are playing multi player
		else if(MultiPlayer.multiPlayer){
			var upper : GameObject;
			var lower : GameObject;
			
			upper = GameObject.Find("BoundaryUpper");
			lower = GameObject.Find("BoundaryLower");
		
			//move the paddle up if "W" is pressed
			if(Input.GetKey("up")){
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
			if(Input.GetKey("down")){
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
	}
}

/*
//Method to control player 2's Player logic
function Update () {
	var upper : GameObject;
	var lower : GameObject;
	
	upper = GameObject.Find("BoundaryUpper");
	lower = GameObject.Find("BoundaryLower");

	//move the paddle up if "W" is pressed
	if(Input.GetKey("up")){
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
	if(Input.GetKey("down")){
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
*/