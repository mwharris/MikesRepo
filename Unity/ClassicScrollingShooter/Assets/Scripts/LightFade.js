#pragma strict

function Update () {
	light.range = Mathf.Lerp(light.range, 0, Time.deltaTime);
}