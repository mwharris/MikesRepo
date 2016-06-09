using UnityEngine;
using System.Collections;

public class NetworkCharacter : Photon.MonoBehaviour {

	private Vector3 realPos = Vector3.zero;
	private Quaternion realRot = Quaternion.identity;

	void Update()
	{
		//Only update a non-local player. Local players are updated by First Person Controller
		if(!photonView.isMine)
		{
			//Smooth our movement from the current position to the received position
			transform.position = Vector3.Lerp(transform.position, realPos, 0.1f);
			transform.rotation = Quaternion.Lerp(transform.rotation, realRot, 0.1f);
		}
	}

	public void OnPhotonSerializeView(PhotonStream stream, PhotonMessageInfo info)
	{
		if(stream.isWriting)
		{
			//This is our local player, send our position to the network
			stream.SendNext(transform.position);
			stream.SendNext(transform.rotation);
		}
		else
		{
			//This is a networked player, receive their position an update the player accordingly
			realPos = (Vector3) stream.ReceiveNext();
			realRot = (Quaternion) stream.ReceiveNext();
		}
	}
}
