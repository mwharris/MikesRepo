using UnityEngine;
//using UnityEngine.Networking;
using System.Collections;

//public class ShootController : NetworkBehaviour
public class ShootController : MonoBehaviour 
{

	public GameObject gun;
	public GameObject debris;
	public Animator recoilAnim;
	public Camera playerCamera;
	public float weaponDamage = 25f;

	private GameObject hitIndicator;
	private float hitIndicatorTimer;
	private float hitIndicatorTimerMax;
	private AudioSource aSource;
	private FXManager fxManager;
	private float cooldownTimer;
	private PhotonView pView;

	void Start()
	{
		cooldownTimer = 20.0f;
		hitIndicatorTimerMax = 0.3f;
		hitIndicatorTimer = hitIndicatorTimerMax;

		//Initialize a reference to the FXManager
		fxManager = GameObject.FindObjectOfType<FXManager>();
		if(fxManager == null)
		{
			Debug.LogError("Couldn't find FXManager!!!");
		}

		//Initialize a reference to the Hit Indicators
		hitIndicator = GameObject.FindGameObjectWithTag("HitIndicator");
		if(hitIndicator == null)
		{
			Debug.LogError("FUCK IS GOING ON?");
		}

		//Get the audio source
		aSource = this.gameObject.GetComponent<AudioSource>();
	}

	void Update() 
	{
		//Reset the recoil animation
		if(recoilAnim.GetCurrentAnimatorStateInfo(0).IsName("Recoil"))
		{
			recoilAnim.SetBool("Shoot", false);
		}

		//Hide the hit indicators from last frame
		HideHitIndicator();

		/*
		//TEST CODE FOR GETTING SHOT
		if(Input.GetButtonDown("Fire2"))
		{
			CmdHitPlayer(this.gameObject);
		}
		*/

		//Determine if we fired (left mouse)
		if(Input.GetButtonDown("Fire1") && cooldownTimer <= 0)
		{
			//Reset the shot timer
			cooldownTimer = 20.0f;

			//Play the recoil animation
			recoilAnim.SetBool("Shoot", true);

			//Shoot a Ray and find the closest thing we hit that isn't ourselves
			Ray ray = new Ray(playerCamera.transform.position, playerCamera.transform.forward);
			Vector3 hitPoint = Vector3.zero;
			Transform hitTransform = FindClosestHitInfo(ray, out hitPoint);

			//Flag to show if we hit an enemy or not
			bool hitEnemy = false;

			//Make sure we actually hit something
			if(hitTransform != null)
			{
				//Determine if the object we hit has hit points
				Health h = hitTransform.GetComponent<Health>();
				//If we did not find an object with health
				if(h == null)
				{
					//Loop through it's parents and try to find one that has health
					while(hitTransform.parent && h == null)
					{
						hitTransform = hitTransform.parent;
						h = hitTransform.GetComponent<Health>();
					}
				}
				//Check if we eventually found an object with health
				if(h != null)
				{
					//Show the hit indicator
					hitEnemy = true;
					ShowHitIndicator();
					//Use an RPC to send damage over the network
					PhotonView pv = h.GetComponent<PhotonView>();
					if(pv != null)
					{
						pv.RPC("TakeDamage", PhotonTargets.AllBuffered, weaponDamage);
					}
				}

				//Show some bullet FX
				if(fxManager != null)
				{
					GunFX(hitPoint, hitEnemy);
				}

				//Instantiate(debris, hitPoint, Quaternion.identity);
			}
			//Hit nothing, show bull FX anyway
			else if(fxManager != null)
			{
				//Make the FX reach a certain distance from the camera
				hitPoint = playerCamera.transform.position + (playerCamera.transform.forward * 100f);
				GunFX(hitPoint, hitEnemy);
			}

			/*
			//Shoot a ray from the center of the camera 
			RaycastHit hit;
			Physics.Raycast(playerCamera.transform.position, playerCamera.transform.forward, out hit);
			//If our ray hit something
			if(hit.collider != null)
			{
				if(hit.transform.tag == "Player")
				{
				} 
				else 
				{
					Instantiate(debris, hit.point, Quaternion.identity);
				}
			}
			*/
		}

		/*
		//Aiming - move the gun into the center of the screen
		if(Input.GetButtonDown("Fire2") && cooldownTimer <= 0){
			gun.transform.position = new Vector3(0f, -0.031f, 0.65f);
		}
		*/

		//Decrement the cooldown timer
		cooldownTimer--;
	}

	//Helper function to show the gun FX
	void GunFX(Vector3 hitPoint, bool hitEnemy)
	{
		//Grab the location of the gun and spawn the FX there
		WeaponData wd = this.transform.GetComponentInChildren<WeaponData>();
		fxManager.GetComponent<PhotonView>().RPC("BulletFX", PhotonTargets.All, wd.transform.position, hitPoint, hitEnemy);
	}

	Transform FindClosestHitInfo(Ray ray, out Vector3 hitPoint)
	{
		Transform closestHit = null;
		float distance = 0f;
		hitPoint = Vector3.zero;

		//Get all objects that our raycast hit
		RaycastHit[] hits = Physics.RaycastAll(ray);

		//Loop through all the things we hit
		foreach(RaycastHit hit in hits)
		{
			//Find the closest object we hit that is not ourselves
			if(hit.transform != this.transform && (closestHit == null || hit.distance < distance))
			{
				//Update the closest hit and distance
				closestHit = hit.transform;
				distance = hit.distance;
				hitPoint = hit.point;
			}
		}

		return closestHit;
	}

	void ShowHitIndicator()
	{
		hitIndicatorTimer = hitIndicatorTimerMax;

		//Show them all
		foreach (Transform child in hitIndicator.transform)
		{
			child.gameObject.SetActive(true);
		}
	}


	void HideHitIndicator()
	{
		hitIndicatorTimer -= Time.deltaTime;

		//Show them all
		if(hitIndicatorTimer <= 0)
		{
			foreach (Transform child in hitIndicator.transform)
			{
				child.gameObject.SetActive(false);
			}
		}
	}
}
