#pragma strict

function Update () {
	GetComponent.<Light>().range = Mathf.Lerp(GetComponent.<Light>().range, 0, Time.deltaTime);
}