// store content in variables
// windows and navigation bar
var navEl = document.getElementById("scores-timer");
var startSecEl = document.getElementById("start-section");
var quizSecEl = document.getElementById("quiz-section");
var endSecEl = document.getElementById("end-section");
var scoreSecEl = document.getElementById("highscore-section");

// nav elements
var timerEl = document.getElementById("timer");

// quiz window
var questionEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var choice1El = document.getElementById("choice-1");
var choice2El = document.getElementById("choice-2");
var choice3El = document.getElementById("choice-3");
var choice4El = document.getElementById("choice-4");
var corrIncorrEl = document.getElementById("correct-incorrect");

// end window
var scoreEl = document.getElementById("score");

// highscore window
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
    question: "Which of these is NOT an operator?",
    choice1: "%",
    choice2: "typeof",
    choice3: "{}",
    choice4: "!=="
};

var question2 = {
    question: ".sort is a(n) ______ of Array.",
    choice1: "object",
    choice2: "property",
    choice3: "variable",
    choice4: "method"
};

var question3 = {
    question: "numArray is an array that stores 3 values. How would you access the second value?",
    choice1: "numArray.1",
    choice2: "numArray[1]",
    choice3: "numArray[\"2\"]",
    choice4: "numArray[2]"
};

var question4 = {
    question: "Window is a type of ______ in JavaScript.",
    choice1: "function",
    choice2: "array",
    choice3: "boolean",
    choice4: "object"
};

var question5 = {
    question: "What are the three components of a for loop?",
    choice1: "initializer, condition, iterator",
    choice2: "iterator initializer, condition",
    choice3: "declaration, condition, initializer",
    choice4: "initializer, declaration, iterator"
};

var questionSet = [question1, question2, question3, question4, question5];
var answerKey = [3, 4, 2, 4, 1];

// declare variables
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
// gets highscore array from local storage and appends to page
function getScores() {
    highscoreList = JSON.parse(localStorage.getItem("highscores"));
    if (!highscoreList) {
        highscoreList = [];
    }
    appendScores();
}

// view highscore page, ends quiz if quiz was started
function viewScores() {
    startSecEl.style.display = "none";
    quizSecEl.style.display = "none";
    endSecEl.style.display = "none";
    scoreSecEl.style.display = "unset";
    navEl.style.visibility = "hidden";
    // ends quiz and keeps end window from appearing
    isDone = true;
    scoresUp = true;
}

// resets variables to begin quiz at beginning
function resetQuiz() {
    currQuestion = 0;
    timerCount = 75;
    isDone = false;
    userAnswer = [];
}

// starts quiz by resetting, starting timer, and appending first question
function startQuiz() {
    resetQuiz();
    timerEl.textContent = "Time: " + timerCount;
    startSecEl.style.display = "none";
    quizSecEl.style.display = "unset";
    setTime();
    nextQuestion();
}

// starts timer, appends to page, ends game if timer reaches 0 or if user answers all questions
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

// sets next question on page, ends game if there are no more questions
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

// checks answer and appends next question
function recordAnswer(event) {
    var userTarget = event.target;
    if (userTarget.matches("button")) {
        userAnswer.push(userTarget.getAttribute("number"));
        checkAnswer();
        nextQuestion();
    }
}

// checks answer, displays feedback, and deducts time if answer is incorrect
function checkAnswer() {
    if (answerKey[currQuestion - 1] != userAnswer[currQuestion - 1]) {
        corrIncorrEl.textContent = "Incorrect!";
        if (timerCount - 10 > 0) {
            timerCount-= 10;
        } else {
            timerCount = 0;
        }
    } else {
        corrIncorrEl.textContent = "Correct!";
    }
    corrIncorrEl.style.visibility = "unset";
}

// appends final score, switches to end window
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

// takes user initials and score and stores in array in local storage, appends scores, switches to highscore window
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

// sorts scores and appends to highscore window
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

// switches to start window
function goBack () {
    scoreSecEl.style.display = "none";
    startSecEl.style.display = "unset";
    navEl.style.visibility = "unset";
    scoresUp = false;
}