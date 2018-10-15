$(document).ready(function() {


    $("#startBtn").on("click", function(){
		$("#startBtn").remove();
		newQuestion();
	});

	$(document).on("click", ".answer-button", function(e){
		clicked(e);
	});

	$(document).on("click", "#play-again", function(){
		resetGame();
	});

   
	
    var questions = [
      {
	    question: "Which character or characters was not present during at least part of the first reign of Pharaoh Rama-Tut in ancient Egypt?",
	    ansOptions: ["Doctor Strange", "Spider-Man", "Apocalypse ", " The Fantastic Four"],
	    correctAnswer: "Spider-Man",
			image: "<img src='assets/images/spiderman.gif'>"
	  }, 

	  {
	    question: "As herald of Galactus, which of the four elements could Terrax the Tamer control with his cosmic power ?",
	    ansOptions: ["Fire", "Water", "Air", "Earth"],
	    correctAnswer: "Earth",
	    image: "<img src='assets/images/earth.gif'>"
	  },

	  {
	    question: "Who is Agent 13 of S.H.I.E.L.D. ?",
	    ansOptions: ["Jasper Sitwell", "Sharon Carter", "Nick Fury", "Countess Valentina de la Fontaine"],
	    correctAnswer: "Sharon Carter",
	    image: "<img src='assets/images/shield.gif'>"
	  },

	  {
	    question: "What is the Supreme Intelligence of the Kree?",
	    ansOptions: ["A wholly artificial intelligence", "A genetically engineered life-form", "A mutated Kree with extraordinarily high intellect ", "A computer system containing the brains of the greatest Kree in history "],
	    correctAnswer: "A computer system containing the brains of the greatest Kree in history",
	    image: "<img src='assets/images/korath.gif'>"
	  },

	  {
	    question: "How long did the Hulk stay with the Avengers?",
	    ansOptions: ["Two issues", "One issue", "He never accepted membership", "Three issues"],
	    correctAnswer: "Two issues",
	    image: "<img src='assets/images/hulk.gif'>"
	  },

	  {
	    question: "When was the Daily Bugle founded?",
	    ansOptions: ["1948", "1897", "1948", "1923"],
	    correctAnswer: "1897",
	    image: "<img src='assets/images/bugle.gif'>"
	  },
	  
	  {
	    question: "Vibranium, the metal found in Wakanda, absorbs vibrations. What does Antarctic Vibranium do?",
	    ansOptions: ["Liquefies metal", "Emits lethal radiation", "Absorbs vibrations ", "Antarctiv vibranium does not exist"],
	    correctAnswer: "Liquefies metal",
	    image: "<img src='assets/images/panther.gif'>"
	  },

	  {
	    question: "Who is the Warlock of the New Mutants",
	    ansOptions: ["A techno-organic alien", "The Maha Yogi", "A mutant sorcerer", "Adam Warlock"],
	    correctAnswer: "A techno-organic alien",
	    image: "<img src='assets/images/warlock3.png'>"
	  },

	  {
	    question: "Who was the first menance to appear in a Doctor Strange story",
	    ansOptions: ["Shazana", "Baron Mordo", "Nightmare", "Dormanmu"],
	    correctAnswer: "Nightmare",
	    image: "<img src='assets/images/nightmare.jpg'>"
	  },

	  {
	    question: "What continually fustrated Luke Cage at the Gem Theater?",
	    ansOptions: ["Noise from the audience ", "D.W.'s obession with film history", "A malfunctioning soda machine", "An annoying customer"],
	    correctAnswer: "A malfunctioning soda machine",
	    image: "<img src='assets/images/soda.jpg'>"
	  }
	  
	];
      

   var currentQuestion = 0;
   var correct = 0;
	 var incorrect = 0;
	 var timer = 10;
	 var unanswered = 0;
	  
    
	  function countDown() {
		  timer--;
		  $("#timer").html(timer);
		if (timer === 0) {
			timeUp();
		}
	   }
	
	 function newQuestion() {
		clock = setInterval(countDown, 1000);
		$("#gamearea").html('<p> <span id = "timer">10 </span> seconds left</p>');
		 $("#gamearea").append('<h4>' + questions[currentQuestion].question + '</h4>');
		 
		 for (var i = 0; i < questions[currentQuestion].ansOptions.length; i++) {
		    $("#gamearea").append('<button class="answer-button" id="button-' + i + ' "data-name="' + questions[currentQuestion].ansOptions[i] + '">'+ questions[currentQuestion].ansOptions[i] + '</button>');	
		}   
		
	 }

	function nextQuestion() {
		timer = 10;
		$("#timer").html(timer);
		currentQuestion++;
		newQuestion();		
	}

	 function timeUp(){
		 clearInterval(clock);
		 unanswered++;
		 $("#gamearea").html("<h3> Time up! </h3>"); 
		 $("#gamearea").append("<p> The correct answer was: " + questions[currentQuestion].correctAnswer + "</p>");
		
		 if (currentQuestion == questions.length - 1 ){
			 setTimeout(scoreBoard, 3 * 1000);
		 } else {
			 setTimeout(nextQuestion, 3 * 1000);
		 }
		
		}

	 function scoreBoard(){
		clearInterval(clock);
		$("#gamearea").html("<p> <strong> Game Over!  </strong> </p>");
		$("#gamearea").append('<p>Correct Answers: ' + correct + '</p>');
		$("#gamearea").append('<p>Incorrect Answers:' + incorrect+ '</p>');
		$("#gamearea").append('<p>Unanswered: ' + unanswered + '</p>');
		$("#gamearea").append('<button id = "play-again">  Play Again </button>');
	}


	 function clicked(e) {
		clearInterval(clock);
		if($(e.target).data("name") === questions[currentQuestion].correctAnswer){
			win(); 
		} else{
			loss();
		}
	 }


	 function win() {
		clearInterval(clock);
		correct++;
		$("#gamearea").html("<h4> Correct! </h4>");
		$("#gamearea").append(questions[currentQuestion].image);
		// $("#gamearea").append('<img src = " '+ questions[currentQuestion].image + ' "/>');
		if (currentQuestion == questions.length - 1 ){
			setTimeout(scoreBoard, 3 * 1000);
		} else{
			setTimeout(nextQuestion, 3 * 1000);
		}
	 }


	 function loss() {
		clearInterval(clock);
		incorrect++;
		$("#gamearea").html("<h4> Incorrect! </h4>");
		$("#gamearea").append("<p> The correct answer was: " + questions[currentQuestion].correctAnswer + "</h3>");
		//$("#gamearea").append('<img src = " '+questions[currentQuestion].image + ' " />');
		$("#gamearea").append(questions[currentQuestion].image);
		$("#gamearea").append("<img src = 'assets/images/spiderman.png'");
		if (currentQuestion == questions.length - 1 ){
			setTimeout(scoreBoard, 3 * 1000);
		} else{
			setTimeout(nextQuestion, 3 * 1000);
		}
	 }

	 function resetGame(){
	    currentQuestion = 0;
		timer = 0 ;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		newQuestion();
	  }





});



