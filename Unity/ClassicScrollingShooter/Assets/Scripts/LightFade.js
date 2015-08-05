#pragma strict

function Update () {
	var light : Light = GetComponent.<Light>();
	light.range = Mathf.Lerp(light.range, 0, Time.deltaTime);
}