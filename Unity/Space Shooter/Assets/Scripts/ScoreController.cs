using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class ScoreController : MonoBehaviour {

	//Player One variables
	public static int p1Score;
	public static int p1Lives;
	public Text playerOneScoreText;
	public Text playerOneLivesText;

	//Player Two variables
	public static int p2Score;
	public static int p2Lives;
	public Text playerTwoScoreText;
	public Text playerTwoLivesText;

	void Awake(){
		p1Score = 0;
		p1Lives = 3;
		p2Score = 0;
		p2Lives = 3;
	}

	void OnGUI () {
		playerOneScoreText.text = "SCORE: " + p1Score.ToString();
		playerTwoScoreText.text = "SCORE: " + p2Score.ToString();
		playerOneLivesText.text = "LIVES: " + p1Lives.ToString();
		playerTwoLivesText.text = "LIVES: " + p2Lives.ToString();
	}
}
