// store content in variables
var navEl = document.getElementById("scores-timer");
var startSecEl = document.getElementById("start-section");
var quizSecEl = document.getElementById("quiz-section");
var endSecEl = document.getElementById("end-section");
var scoreSecEl = document.getElementById("highscore-section");

var timerEl = document.getElementById("timer");

var questionEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var choice1El = document.getElementById("choice-1");
var choice2El = document.getElementById("choice-2");
var choice3El = document.getElementById("choice-3");
var choice4El = document.getElementById("choice-4");
var corrIncorrEl = document.getElementById("correct-incorrect");

var scoreEl = document.getElementById("score");

var highscoreListEl = document.getElementById("highscores");

// store form elements in variables
var viewScoresButton = document.getElementById("view-scores");
var startButton = document.getElementById("start");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var backButton = document.getElementById("back");
var clearButton = document.getElementById("clear");

// event listeners
viewScoresButton.addEventListener("click", viewScores);
startButton.addEventListener("click", startQuiz);
answersEl.addEventListener("click", recordAnswer);
submitButton.addEventListener("click", submitInitials);
backButton.addEventListener("click", goBack);
clearButton.addEventListener("click", clearScores);

// create questions & answers
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
var answerKey = [1, 1, 1];

// initialize variables
var userAnswer;
var currQuestion;
var timerCount;
var isDone;
var scoresUp = false;
var finalScore;
var highscoreList;

// run init functions
getScores();

// functions
function getScores() {
    highscoreList = JSON.parse(localStorage.getItem("highscores"));
    if (!highscoreList) {
        highscoreList = [];
    }
    appendScores();
}

function viewScores() {
    startSecEl.style.display = "none";
    quizSecEl.style.display = "none";
    endSecEl.style.display = "none";
    scoreSecEl.style.display = "unset";
    navEl.style.visibility = "hidden";
    // ends game and keeps end page from appearing
    isDone = true;
    scoresUp = true;
}

function resetQuiz() {
    currQuestion = 0;
    timerCount = 20;
    isDone = false;
    userAnswer = [];
}

function startQuiz() {
    resetQuiz();
    timerEl.textContent = "Time: " + timerCount;
    startSecEl.style.display = "none";
    quizSecEl.style.display = "unset";
    setTime();
    nextQuestion();
}

function setTime() {
    var timerInterval = setInterval(function() {
        timerCount--;
        timerEl.textContent = "Time: " + timerCount;
        corrIncorrEl.style.visibility = "hidden";
        if (isDone || timerCount === 0) {
            clearInterval(timerInterval);
            timerEl.textContent = "Time: 0";
            endQuiz();
        }
    }, 1000);
}

function nextQuestion() {
    if (questionSet[currQuestion] === undefined) {
        isDone = true;
    } else {
        questionEl.textContent = questionSet[currQuestion].question;
        choice1El.textContent = questionSet[currQuestion].choice1;
        choice2El.textContent = questionSet[currQuestion].choice2;
        choice3El.textContent = questionSet[currQuestion].choice3;
        choice4El.textContent = questionSet[currQuestion].choice4;
        currQuestion++;
    }
}

function recordAnswer(event) {
    var userTarget = event.target;
    if (userTarget.matches("button")) {
        userAnswer.push(userTarget.getAttribute("number"));
        checkAnswer();
        nextQuestion();
    }
}

function checkAnswer() {
    if (answerKey[currQuestion - 1] != userAnswer[currQuestion - 1]) {
        corrIncorrEl.textContent = "Incorrect!";
        if (timerCount - 5 > 0) {
            timerCount-= 5;
        } else {
            timerCount = 0;
        }
    } else {
        corrIncorrEl.textContent = "Correct!";
    }
    corrIncorrEl.style.visibility = "unset";
}

function endQuiz() {
    if (timerCount < 0) {
        finalScore = 0;
    } else {
        finalScore = timerCount;
    }
    scoreEl.textContent = finalScore;
    if (!scoresUp) {
        quizSecEl.style.display = "none";
        endSecEl.style.display = "unset";
    }
}

function submitInitials(event) {
    event.preventDefault();
    var newScore = {
        initials: initialsInput.value,
        score: finalScore
    };
    highscoreList.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscoreList));
    appendScores();
    initialsInput.value = "";
    endSecEl.style.display = "none";
    scoreSecEl.style.display = "unset";
    navEl.style.visibility = "hidden";
}

// if event is passed, it will completely erase the stored scores
// if event is not passed, it only clear the highscore list element
function clearScores(event) {
    if (event) {
        highscoreList = [];
        localStorage.setItem("highscores", JSON.stringify(highscoreList));
    }
    while (highscoreListEl.firstChild) {
        highscoreListEl.removeChild(highscoreListEl.firstChild);
    }
}

function appendScores() {
    // sort highscores by score
    highscoreList.sort((a, b) => {
        return b.score - a.score;
    });

    clearScores();    

    // re-appends highscores to highscore list element
    for (i = 0; i < highscoreList.length; i++) {
        var highscore = document.createElement("li");
        highscore.textContent = highscoreList[i].initials + " - " + highscoreList[i].score;
        highscoreListEl.appendChild(highscore);
    }
}

function goBack () {
    scoreSecEl.style.display = "none";
    startSecEl.style.display = "unset";
    navEl.style.visibility = "unset";
    scoresUp = false;
}