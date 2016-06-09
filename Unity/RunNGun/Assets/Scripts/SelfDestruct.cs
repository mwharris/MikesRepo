using UnityEngine;
using System.Collections;

public class SelfDestruct : MonoBehaviour {

	public float selfDestructTime = 1.0f;

	void Update () 
	{
		//Decrement the timer every frame
		selfDestructTime -= Time.deltaTime;

		//Destroy this game object after the timer is up
		if(selfDestructTime <= 0)
		{
			//Check if we were instantiated on the network or not
			PhotonView pv = this.transform.GetComponent<PhotonView>();
			if(pv != null && pv.instantiationId != 0){
				PhotonNetwork.Destroy(this.gameObject);
			} else {
				Destroy(this.gameObject);
			}
		}
	}
}
