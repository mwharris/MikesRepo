using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class Health : MonoBehaviour {

	public float hitPoints = 100f;
	public AudioClip[] hurtSounds; 

	private AudioSource aSource;
	private Image damageImage;
	private float currentHitPoints;
	private float respawnTimer = 3f;
	private float flashSpeed = 5f;
	private Color flashColor = new Color(1.0f, 0f, 0f, 0.2f);

	void Start () 
	{
		//Store the current hit points
		currentHitPoints = hitPoints;
		//Get a reference to an image that will appear whenever we are damaged
		damageImage = GameObject.FindGameObjectWithTag("DamageImage").GetComponent<Image>();
		//Grab a reference to the audio source for hurt sounds
		aSource = this.transform.GetComponent<AudioSource>();
	}

	void Update()
	{
		damageImage.color = Color.Lerp(damageImage.color, Color.clear, flashSpeed * Time.deltaTime);
	}

	[PunRPC]
	public void TakeDamage(float damage) 
	{
		currentHitPoints -= damage;

		//If this is our local player
		if(this.transform.GetComponent<PhotonView>().isMine){
			//Display a damage image
			damageImage.color = flashColor;
			//Play a sound indicating we were shot
			PlayHurtSound();
		} 

		if(currentHitPoints <= 0)
		{
			Die();
		}
	}

	void Die()
	{
		//If we did not instantiate this object over the network
		if(this.transform.GetComponent<PhotonView>().instantiationId == 0){
			//Simply destroy it in our scene
			Destroy(this.gameObject);
		} 
		//If we did instantiate it over the network
		else if(this.transform.GetComponent<PhotonView>().isMine){
			//Respawn this player if it is ours
			if(gameObject.tag == "Player"){
				//Get a reference to our NetworkManager in order to manipulate variables
				NetworkManager nm = GameObject.FindObjectOfType<NetworkManager>();
				//Enable the lobby camera so we don't get a blank screen
				nm.lobbyCamera.gameObject.SetActive(true);
				GameObject.FindGameObjectWithTag("Reticle").GetComponent<Image>().enabled = false;
				//Start our respawn timer
				nm.respawnTimer = respawnTimer;
			}

			//Delete it over the network
			PhotonNetwork.Destroy(this.gameObject);
		}
	}

	void PlayHurtSound()
	{
		AudioClip clipToPlay;

		//Pick & play a random footstep sound from the array,
		int n = Random.Range(1, hurtSounds.Length);
		clipToPlay = hurtSounds[n];
		aSource.PlayOneShot(clipToPlay);

		//Move picked sound to index 0 so it's not picked next time
		hurtSounds[n] = hurtSounds[0];
		hurtSounds[0] = clipToPlay;
	}

	/*
	//Suicide button for testing respawn
	void OnGUI()
	{
		if(this.transform.GetComponent<PhotonView>().isMine && gameObject.tag == "Player")
		{
			if(GUI.Button(new Rect(Screen.width-100, 0, 100, 40), "Suicide!"))
			{
				Die();
			}
		}
	}
	*/
}
