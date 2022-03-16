// store content in variables
var navBar = document.getElementById("scores-timer")
var startSec = document.getElementById("start-section");
var quizSec = document.getElementById("quiz-section");
var endSec = document.getElementById("end-section");
var scoreSec = document.getElementById("highscore-section");

var timeLeft = document.getElementById("timer");

var question = document.getElementById("question");
var answers = document.getElementById("answers");
var choice1 = document.getElementById("choice-1");
var choice2 = document.getElementById("choice-2");
var choice3 = document.getElementById("choice-3");
var choice4 = document.getElementById("choice-4");

var score = document.getElementById("score");

// store buttons in variables
var start = document.getElementById("start");
var submit = document.getElementById("submit");
var back = document.getElementById("back");
var scores = document.getElementById("view-scores");

// create questions, answers, and store in array
var question1 = {
    question: "question 1",
    choice1: "answer1",
    choice2: "answer2",
    choice3: "answer3",
    choice4: "answer4",
}

var question2 = {
    question: "question 2",
    choice1: "answer1 agin",
    choice2: "answer2 again",
    choice3: "answer3 agian",
    choice4: "answer4 agian",
}

var question3 = {
    question: "question 3",
    choice1: "answer1once",
    choice2: "answermore2",
    choice3: "answerandante!3",
    choice4: "answer4",
}

var questionSet = [question1, question2, question3];
var answerKey = [];
var userAnswer = [];
var currQuestion = 0;

var timerCount = 20;

// exercise 20 for selectors
// add event listeners
start.addEventListener("click", startQuiz);
submit.addEventListener("click", subInitials);
back.addEventListener("click", goBack);
scores.addEventListener("click", viewScores);
answers.addEventListener("click", recordAnswer); // temp

// functions

// goes from start to quiz
function startQuiz() {
    startTimer();
    startSec.style.display = "none";
    quizSec.style.display = "unset";
    nextQuestion();
}

// goes from end to highscores
function subInitials() {
    endSec.style.display = "none";
    scoreSec.style.display = "unset";
    navBar.style.visibility = "hidden";
}

// goes from highscores to start
function goBack() {
    scoreSec.style.display = "none";
    startSec.style.display = "unset";
    navBar.style.visibility = "visible";
}

// goes from any page to highscores
function viewScores() {
    startSec.style.display = "none";
    quizSec.style.display = "none";
    endSec.style.display = "none";
    scoreSec.style.display = "unset";
    navBar.style.visibility = "hidden";
}

function recordAnswer(event) {
    var element = event.target;
    if (element.matches("button")) {
        //get number & add to user answers
        userAnswer.push(element.getAttribute("number"));
        //check if wrong & subtract time else say correct
    }
    nextQuestion();
}

// sets next question on page
function nextQuestion() {
    if (questionSet[currQuestion] === undefined) {
        //end game, store score
    } else {
        question.textContent = questionSet[currQuestion].question;
        choice1.textContent = questionSet[currQuestion].choice1;
        choice2.textContent = questionSet[currQuestion].choice2;
        choice3.textContent = questionSet[currQuestion].choice3;
        choice4.textContent = questionSet[currQuestion].choice4;
        currQuestion++;
    }
}

function startTimer() {
    timer = setInterval(function() {
        timeLeft.textContent = "Time: " + timerCount; // !!timer delay
        timerCount--;
        if(timerCount === 0) {
            clearInterval(timer);
            //end game, store score
        }
    }, 1000);
}





// function startTimer() {
//     // Sets timer
//     timer = setInterval(function() {
//       timerCount--;
//       timerElement.textContent = timerCount;
//       if (timerCount >= 0) {
//         // Tests if win condition is met
//         if (isWin && timerCount > 0) {
//           // Clears interval and stops timer
//           clearInterval(timer);
//           winGame();
//         }
//       }
//       // Tests if time has run out
//       if (timerCount === 0) {
//         // Clears interval
//         clearInterval(timer);
//         loseGame();
//       }
//     }, 1000);
//   }
  