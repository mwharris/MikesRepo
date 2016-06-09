using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class HeroCollision : MonoBehaviour {
	public HeroController heroScript;
	public Animator anim;
	public Text deathText;
	public Text restartText;
	public AudioSource crashAudio;

	void OnCollisionEnter2D (Collision2D c) {
		//Kill the hero controls when we hit something
		Destroy(heroScript);
		//Show the game over text
		deathText.gameObject.SetActive(true);
		restartText.gameObject.SetActive(true);
		//Update the animator to show a dead pig
		anim.SetBool("Dead", true);
		//Add the GameRestarter to the Hero on death
		this.gameObject.AddComponent<GameRestarter>();
		//Play a sound when we hit something
		crashAudio.Play();
	}
}
