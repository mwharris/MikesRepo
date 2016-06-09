using UnityEngine;
using System.Collections;

public class FirstPersonController : MonoBehaviour {
	//75,5,0,0,60,8
	public float movementSpeed = 10.0f;
	public float mouseSensitivity = 5.0f;
	public float verticalRotation = 0f;
	public float verticalVelocity = 0f;
	public float upDownRange = 60.0f;
	public float jumpSpeed = 5f;
	public float walkTimer = 0f;
	public float runTimer = 0f;
	public Camera playerCamera;
	public AudioClip jumpSound;                 

	private float origWalkTimer;
	private float origRunTimer;
	private bool wasAirborne;
	private AudioSource aSource;
	private CharacterController cc;
	private GameObject gunObj;
	private Vector3 velocity;
	private float forwardSpeed;
	private float sideSpeed;
	private int jumps;
	private FXManager fxManager;

	void Start () {
		//Initialize a reference to the character controller component
		cc = this.GetComponent<CharacterController>();
		//Lock the mouse cursor
		Screen.lockCursor = true;
		//We will only ever have 2 jumps
		jumps = 2;
		//Get a reference to the audio source
		aSource = this.transform.GetComponent<AudioSource>();
		//Keep track of how long our walk audio delay should be
		origWalkTimer = walkTimer;
		origRunTimer = runTimer;
		//Initialize a reference to the FXManager
		fxManager = GameObject.FindObjectOfType<FXManager>();
	}
	
	void Update () {
		//Handle any mouse input that occurred
		handleMouseInput();

		//Handle the movement of the player
		handleMovement();

		//Apply gravity
		handleGravity();

		//Handle jumping of the player
		handleJumping();

		//Set a flag if we're airborne this frame
		if(!cc.isGrounded)
		{
			wasAirborne = true;
		}
		else 
		{
			wasAirborne = false;
		}

		//Linear drag along the X and Z while grounded
		if(cc.isGrounded){
			velocity.x *= 0.9f;
			velocity.z *= 0.9f;
		}

		//Move the char controller
		cc.Move(velocity * Time.deltaTime);
	}

	//Handle any mouse input to rotate our camera view
	void handleMouseInput()
	{
		//Left-Right rotation based on the mouse
		float rotLeftRight = Input.GetAxis("Mouse X") * mouseSensitivity;
		transform.Rotate(0, rotLeftRight, 0);

		//Up-Down rotation based on the mouse
		verticalRotation -= Input.GetAxis("Mouse Y") * mouseSensitivity;
		//Clamp the range so we don't look too far up or down
		verticalRotation = Mathf.Clamp(verticalRotation, -upDownRange, upDownRange);
		//Rotate the camera using Euler angles
		playerCamera.transform.localRotation = Quaternion.Euler(verticalRotation, 0, 0);
	}

	//Handle any WASD or arrow key movement
	void handleMovement()
	{
		bool isSprinting = false;

		//Decrement the walk/run audio timers
		walkTimer -= Time.deltaTime;
		runTimer -= Time.deltaTime;

		//Grounded movement
		if(cc.isGrounded)
		{
			//Get the movement input
			forwardSpeed = Input.GetAxis("Vertical") * movementSpeed;
			sideSpeed = Input.GetAxis("Horizontal") * movementSpeed;
			//Sprinting
			if(Input.GetKey(KeyCode.LeftShift))
			{
				forwardSpeed *= 1.5f;
				isSprinting = true;
			}
			//Play a footstep sound when moving
			if(forwardSpeed != 0 || sideSpeed != 0)
			{
				PlayFootStepAudio(isSprinting);
			}
			//Add the x / z movement
			if(forwardSpeed == 0 && sideSpeed == 0)
			{
				velocity.x = 0;
				velocity.z = 0;
			} 
			else 
			{
				velocity += forwardSpeed * transform.forward * Time.deltaTime;
				velocity += sideSpeed * transform.right * Time.deltaTime;
			}
		}
	}

	//Pull the player down continuously unless we are grounded
	void handleGravity()
	{
		if(!cc.isGrounded)
		{
			//Add gravity only when we aren't on the ground
			velocity += Physics.gravity * Time.deltaTime;
		} 
		else 
		{
			//No y-velocity while grounded
			//velocity += -Physics.gravity * Time.deltaTime;
			//Double jump enabled while grounded
			jumps = 2;
		}
	}

	//Push the player upwards if we jumped
	void handleJumping()
	{
		//Play a sound this frame if we hit the ground
		if(wasAirborne && cc.isGrounded)
		{
			//Play a networked landing sound
			fxManager.GetComponent<PhotonView>().RPC("LandingFX", PhotonTargets.All, this.transform.position);
		}
		//Read the jump input
		if(Input.GetButtonDown("Jump") && jumps > 0)
		{
			//Decrement our jumps so we can only jump twice
			jumps--;
			//Play a sound of use jumping
			PlayJumpSound(!cc.isGrounded);
			//Add an immediate velocity upwards to jump
			velocity.y = jumpSpeed;
			//Add a little horizontal movement if we double jumped while holding a key
			if(!cc.isGrounded)
			{
				//If the player is hold left or right at the time of the jump, apply a force in the direction they are pressing.
				if(Input.GetKey(KeyCode.S))
				{
					velocity = velocity + (-transform.forward * 7);
				}
				if(Input.GetKey(KeyCode.A))
				{
					velocity = velocity + (-transform.right * 7);
				}
				if(Input.GetKey(KeyCode.D))
				{
					velocity = velocity + (transform.right * 7);
				}
				//Jump upwards
				velocity.y = jumpSpeed;
			}
		}
	}

	private void PlayFootStepAudio(bool isSprinting)
	{
		if (!cc.isGrounded && !aSource.isPlaying)
		{
			return;
		}

		if((!isSprinting && walkTimer <= 0) || (isSprinting && runTimer <= 0))
		{
			//Reset the audio timer
			walkTimer = origWalkTimer;
			runTimer = origRunTimer;
			//Play a networked walking sound
			fxManager.GetComponent<PhotonView>().RPC("FootstepFX", PhotonTargets.All, this.transform.position);
		}
	}

	private void PlayJumpSound(bool isDoubleJump)
	{
		if(isDoubleJump)
		{
			//Play a networked double jump sound
			fxManager.GetComponent<PhotonView>().RPC("DoubleJumpFX", PhotonTargets.All, this.transform.position);
		}
		else
		{
			aSource.clip = jumpSound;
			aSource.Play();
		}
	}

	/*
	Vector3 GetHorizontalMovementDirection() 
	{ 
		Vector3 direction = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical")); 
		return transform.TransformDirection(direction); 
	}
	*/
}
