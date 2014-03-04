#pragma strict

var BeepSound : AudioClip;

//method to create cubes for our game using a double loop
function Start () {
	for(var y = 0; y < 8; y++){
		for(var x = 0; x < 15; x++){
			//create a cube
			var cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
			cube.name = "Brick";
			
			//x and y position dependent on loop index
			cube.transform.position = Vector3(x*2 - 14, y - 1, 0);
			
			//scale the cube
			cube.transform.localScale = Vector3(1.9, 0.9, 1);
			
			//add a script to the cube
			cube.AddComponent("BrickScript");
			
			//set this cube as a trigger
			cube.collider.isTrigger = true;
			
			//slightly different color based on loop index
			if(y < 2){
				cube.renderer.material.color = Color.yellow;
			} else if(y < 4){
				cube.renderer.material.color = Color.cyan;
			} else if(y < 6){
				cube.renderer.material.color = Color.blue;
			} else {
				cube.renderer.material.color = Color.red;
			}
		}
	}
}