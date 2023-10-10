//Make an array of words
var wordList = ["Stargate", "Atlantis", "Ancients", "Asgard", "Nox", "ZPM", "Thor", "Hammond of Texas", "Teal'c", "Ronan Dex"];
var wrongLetter = [];

var randomWord;
var hiddenWord;
var updateWord;
var wordObject;

var score = 0;
var lives = 6;

generateWord();

// Replace the hidden character in the word with the guessLetter===========================
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, parseInt(index)) + replacement + this.substr(parseInt(index)+1);
}

//Pick a random word from the list
function pickRandomWord(){
	var randomNum = Math.floor(Math.random()*wordList.length);
	randomWord = wordList[randomNum].toLowerCase();
	console.log("The word is: " + randomWord);
	wordObject = Object.assign({},randomWord);
}

//converts each character in the word to a _
function hideWord(){
	hiddenWord = randomWord.replace(/\w/gi, "_");
	updateWord = hiddenWord;
}

// starts a new game
function generateWord(){
	wrongLetter = [];
	lives = 6;
	pickRandomWord();
	hideWord();
	hideDraw();
	document.getElementById("currentWord").innerHTML=updateWord;
	document.getElementById("lettersGuessed").innerHTML=wrongLetter;
	document.getElementById("winDialogue").innerHTML="";
	document.getElementById("playAgain").style.visibility="";
}

//draws the hangman drawing
function draw(lives){

	if (lives == 6){
		return;
	}

	else if (lives == 5){
		document.getElementById("head").style.visibility="visible"; //head
	}

	else if (lives == 4){
		document.getElementById("torso").style.visibility="visible"; //body

	}

	else if (lives == 3){
		document.getElementById("arms").style.borderBottomColor="#21FF06"; //leftArm

	}

	else if (lives == 2){
		document.getElementById("arms").style.borderRightColor="#21FF06"; //rightArm

	}

	else if (lives == 1){
		document.getElementById("legs").style.borderLeftColor="#21FF06"; //leftLeg

	}

	else if (lives == 0){
		document.getElementById("legs").style.borderTopColor="#21FF06"; //rightLeg
	}
}

//hides the hangman drawing
function hideDraw(){
		document.getElementById("head").style.visibility=""; //head
		document.getElementById("torso").style.visibility=""; //body
		document.getElementById("arms").style.borderBottomColor=""; //leftArm
		document.getElementById("arms").style.borderRightColor=""; //rightArm
		document.getElementById("legs").style.borderLeftColor=""; //leftLeg
		document.getElementById("legs").style.borderTopColor=""; //rightLeg}
}

// Get keystroke from user and validate if it's an alphabet and if it was already guessed
document.onkeyup = function(event){
	if(event.keyCode <= 90 && event.keyCode >= 65 && wrongLetter.includes(event.key) == false){
		wordSearch(event.key);
	}
}

// Search word for the guessLetter
function wordSearch(guessLetter){



//Check to see if the letter is in the word at all
	if (!randomWord.includes(guessLetter)){
		wrongLetter.push(guessLetter);
		document.getElementById("lettersGuessed").innerHTML=wrongLetter.join(', ');
		lives--;
		draw(lives);

//alert user they lost
		if(lives <= 0){
			document.getElementById("winDialogue").innerHTML="You Lost";
			document.getElementById("playAgain").style.visibility="visible";
		}
	}


//change appropriate letter
	for (key in wordObject){
		if (wordObject[key] == guessLetter){
			updateWord = updateWord.replaceAt(key, guessLetter);
		}

		document.getElementById("currentWord").innerHTML=updateWord;

//alert user they won
		if(updateWord == randomWord){
			score++;
			document.getElementById("winScore").innerHTML=score;
			var youWon = "You Won!"
			document.getElementById("winDialogue").innerHTML=youWon;
			document.getElementById("playAgain").style.visibility="visible";
		}
	}
}
