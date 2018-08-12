$(document).ready(function() {
   
   
    var questions = [
      {
	    question: "Who founded Marvel Comics?",
	    ansOptions: ["Stan Lee", "Martin Goodman", "John Adams", "Bill Burr"],
	    correctAnswer: "Martin Goodman",
	    image: "<img src='assets/images/'>"
	  }, 
	  {
	    question: "Which Organization ....?",
	    ansOptions: ["KGB", "SPR", "WFS", "POE"],
	    correctAnswer: "KGB",
	    image: "<img src='assets/images/'>"
      }];
      

      var currentQuestion = 0;
      var counter = 20;
      var correct = 0;
      var incorrect = 0;
	  

	function newQuestion() {
    	$("#gamearea").append("<p><strong>" + 
    		questions[currentQuestion].question + 
    		"</p><p class='ansOptions'>" + 
    		questions[currentQuestion].ansOptions[0] + 
    		"</p><p class='ansOptions'>" + 
    		questions[currentQuestion].ansOptions[1] + 
    		"</p><p class='ansOptions'>" + 
    		questions[currentQuestion].ansOptions[2] + 
    		"</p><p class='ansOptions'>" + 
    		questions[currentQuestion].ansOptions[3] + 
    		"</strong></p>");
	}

	function win() {
		$("#gamearea").html("<p>Correct</p>");
		correct++;
		var correctAnswer = questions[currentQuestion].correctAnswer;
		$("#gamearea").append(
			correctAnswer + 
			questions[currentQuestion].image);
		setTimeout(nextQuestion, 1000 * 2);
		currentQuestion++;
	}


	function loss() {
		$("#gamearea").html("<p>Wrong</p>");
		incorrect++;
		var correctAnswer = questions[currentQuestion].correctAnswer;
		$("#gamearea").append(
			correctAnswer + 
			questions[currentQuestion].image);
		setTimeout(nextQuestion, 1000 * 2);
		currentQuestion++;
	}


	function timeUp() {
		if (counter === 0) {
			$("#gamearea").html("<p>You ran out of time!</p>");
			incorrect++;
			var correctAnswer = questions[currentQuestion].correctAnswer;
			$("#gamearea").append(
				correctAnswer + 
				questions[currentQuestion].image);
			setTimeout(nextQuestion, 1000 * 2);
			currentQuestion++;
		}
	}

	function scoreBoard() {
		if (correct === questions.length) {
			var gameOverMsg = "Awesome";
		}
		else if (correct > incorrect) {
			var gameOverMsg = "Nice try";
		}
		else {
			var gameOverMsg = "Good Luck next time";
		}
		$("#gamearea").html("<p>" + gameOverMsg + "</p>" + "<p>You got <strong>" + 
			correct + "</strong> questions right.</p>" + 
			"<p>You got <strong>" + incorrect + "</strong> questions wrong.</p>");
		$("#gamearea").append("<button id='startBtn'>Play Again</button>");
		resetGame();
		$("#startBtn").click(nextQuestion);
	}

	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (counter < 1) {
				clearInterval(clock);
				timeUp();
			}
			if (counter> 0) {
				counter--;
			}
			$("#timer").html("<strong>" + counter+ "</strong>");
		}
	}


	function nextQuestion() {
		if (currentQuestion < questions.length) {
			counter = 20;
			$("#gamearea").html("<p>" + counter+ "</span> seconds left!</p>");
			newQuestion();
			timer();
			timeUp();
		}
		else {
			scoreBoard();
		}
	}

	
	function resetGame() {
		currentQuestion = 0;
		correct = 0;
		incorrect = 0;
	}

    function startGame() {
    	$("#gamearea").html("<p>" + counter + "</span> seconds left!</p>");
    	$("#startBtn").hide();
		newQuestion();
    	timer();
    	timeUp();
    }

    $("#startBtn").click(nextQuestion);

   
	$("#gamearea").on("click", ".ansOptions", (function() {
		var userGuess = $(this).text();
		if (userGuess === questions[currentQuestion].correctAnswer) {
			clearInterval(clock);
			win();
		}
		else {
			clearInterval(clock);
			loss();
		}
	}));
});