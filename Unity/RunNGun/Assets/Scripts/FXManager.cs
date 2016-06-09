using UnityEngine;
using System.Collections;

public class FXManager : MonoBehaviour {

	public GameObject bulletFxPrefab;
	public AudioSource aSource;
	public AudioClip[] footstepSounds;   
	public AudioClip gunShot;
	public AudioClip landingSound; 
	public AudioClip doubleJumpSound;   
	public AudioClip hitSound;

	[PunRPC]
	void BulletFX(Vector3 startPos, Vector3 endPos, bool hitEnemy)
	{
		//Show the bullet FX
		GameObject bulletFX = (GameObject) Instantiate(bulletFxPrefab, startPos, Quaternion.LookRotation(endPos - startPos));
		//Show our line rendered bullet trail
		LineRenderer lr = bulletFX.transform.Find("LineFX").GetComponent<LineRenderer>();
		lr.SetPosition(0, startPos);
		lr.SetPosition(1, endPos);
		//Play our gun shot
		AudioSource.PlayClipAtPoint(gunShot, startPos);
		//Play a sound if we hit an enemy
		if(hitEnemy)
		{
			aSource.PlayOneShot(hitSound);
		}
	}

	[PunRPC]
	void FootstepFX(Vector3 pos)
	{
		AudioClip clipToPlay;

		//Pick & play a random footstep sound from the array,
		int n = Random.Range(1, footstepSounds.Length);
		clipToPlay = footstepSounds[n];
		AudioSource.PlayClipAtPoint(clipToPlay, pos);

		//Move picked sound to index 0 so it's not picked next time
		footstepSounds[n] = footstepSounds[0];
		footstepSounds[0] = clipToPlay;
	}

	[PunRPC]
	void LandingFX(Vector3 pos)
	{
		AudioSource.PlayClipAtPoint(landingSound, pos);
	}

	[PunRPC]
	void DoubleJumpFX(Vector3 pos)
	{
		AudioSource.PlayClipAtPoint(doubleJumpSound, pos);
	}
}
