// store content in variables
var navBar = document.getElementById("scores-timer")
var startSec = document.getElementById("start-section");
var quizSec = document.getElementById("quiz-section");
var endSec = document.getElementById("end-section");
var scoreSec = document.getElementById("highscore-section");

// store buttons in variables
var start = document.getElementById("start");
var submit = document.getElementById("submit");
var back = document.getElementById("back");
var scores = document.getElementById("view-scores");

// add event listeners
start.addEventListener("click", startQuiz);
submit.addEventListener("click", subInitials);
back.addEventListener("click", goBack);
scores.addEventListener("click", viewScores);

// functions

// goes from start to quiz
function startQuiz() {
    startSec.style.display = "none";
    quizSec.style.display = "unset";
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