// store content in variables
var timerEl = document.getElementById("timer");

var questionEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var choice1El = document.getElementById("choice-1");
var choice2El = document.getElementById("choice-2");
var choice3El = document.getElementById("choice-3");
var choice4El = document.getElementById("choice-4");

var scoreEl = document.getElementById("score");

var highscoreListEl = document.getElementById("highscores");

// store form elements in variables
var startButton = document.getElementById("start");
var initialsInput = document.getElementById("initials");
var submitButton = document.getElementById("submit");
var clearButton = document.getElementById("clear");

// event listeners
startButton.addEventListener("click", startQuiz);
answersEl.addEventListener("click", recordAnswer);
submitButton.addEventListener("click", submitInitials);
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
var finalScore;


// TODO local storage
var highscoreList = [];

// functions
function resetQuiz() { //!! somethings weird with this
    // TODO reset from prev quiz: currQues, timerCount, isDone
    currQuestion = 0;
    timerCount = 20;
    isDone = false;
    userAnswer = [];
}

function startQuiz() {
    resetQuiz();
    // TODO window switch
    timerEl.textContent = "Time: " + timerCount;
    setTime();
    nextQuestion();
}

function setTime() {
    var timerInterval = setInterval(function() {
        timerCount--;
        timerEl.textContent = "Time: " + timerCount; // !!timer delay
        if(isDone || timerCount === 0) {
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
        if (answerKey[currQuestion - 1] != userAnswer[currQuestion - 1]) {
            timerCount-= 5; // !! score can appear as negative
            // TODO correct/incorrect popups
            console.log("incorrect"); // !!bug
        } else {
            console.log("correct");
        }
        nextQuestion();
    }
}

function endQuiz() {
// TODO window switch
    finalScore = timerCount;
    scoreEl.textContent = finalScore;
    console.log("fewinee");
}

function submitInitials(event) {
    event.preventDefault(); // !!not clearing input
    var newScore = {
        initials: initialsInput.value,
        score: finalScore
    };
    highscoreList.push(newScore);
    appendScores();
    // TODO window switch
}

function clearScores() {
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

    // reappends highscores to highscore list element
    for (i = 0; i < highscoreList.length; i++) {
        var highscore = document.createElement("li");
        highscore.textContent = highscoreList[i].initials + " - " + highscoreList[i].score;
        highscoreListEl.appendChild(highscore);
    }
}

// function addHighscore() {
//     var highscore = {
//         initials: initialInput.value,
//         score: finalScore
//     };
//     initialInput.value = ""; //prevent default
//     highscoresList.push(highscore);


//     // students.sort((a, b) => {
//     //     return b.age - a.age;
//     // });
//     // console.log(students);

//     highscoresList.sort((a, b) => {
//         return b.score - a.score;
//     });
//     console.log(highscoresList);
// }



// function recordAnswer(event) {
//     var element = event.target;
//     if (element.matches("button")) {
//         //get number & add to user answers
//         userAnswer.push(element.getAttribute("number"));
//         //check if wrong & subtract time else say correct
//     }
//     nextQuestion();
// }




// var secondsLeft = 10;

// function setTime() {
//   // Sets interval in variable
//   var timerInterval = setInterval(function() {
//     secondsLeft--;
//     timeEl.textContent = secondsLeft + " seconds left till colorsplosion.";

//     if(secondsLeft === 0) {
//       // Stops execution of action at set interval
//       clearInterval(timerInterval);
//       // Calls function to create and append image
//       sendMessage();
//     }

//   }, 1000);
// }

// // Function to create and append colorsplosion image
// function sendMessage() {
//   timeEl.textContent = " ";
//   var imgEl = document.createElement("img");
//   imgEl.setAttribute("src", "images/image_1.jpg");
//   mainEl.appendChild(imgEl);

// }

// setTime();






// // store content in variables
// var navEl = document.getElementById("scores-timer")
// var startSecEl = document.getElementById("start-section");
// var quizSecEl = document.getElementById("quiz-section");
// var endSecEl = document.getElementById("end-section");
// var scoreSecEl = document.getElementById("highscore-section");

// var timerEl = document.getElementById("timer");

// var questionEl = document.getElementById("question");
// var answersEl = document.getElementById("answers");
// var choice1El = document.getElementById("choice-1");
// var choice2El = document.getElementById("choice-2");
// var choice3El = document.getElementById("choice-3");
// var choice4El = document.getElementById("choice-4");

// var scoreEl = document.getElementById("score");

// // store buttons/input in variables
// var startButton = document.getElementById("start");
// var initialInput = document.getElementById("initials");
// var submitButton = document.getElementById("submit");
// var backButton = document.getElementById("back");
// var scoresButton = document.getElementById("view-scores");

// // create questions, answers, and store in array
// var question1 = {
//     question: "question 1",
//     choice1: "answer1",
//     choice2: "answer2",
//     choice3: "answer3",
//     choice4: "answer4",
// }

// var question2 = {
//     question: "question 2",
//     choice1: "answer1 agin",
//     choice2: "answer2 again",
//     choice3: "answer3 agian",
//     choice4: "answer4 agian",
// }

// var question3 = {
//     question: "question 3",
//     choice1: "answer1once",
//     choice2: "answermore2",
//     choice3: "answerandante!3",
//     choice4: "answer4",
// }

// var questionSet = [question1, question2, question3];
// var answerKey = [];
// var userAnswer = [];
// var currQuestion = 0;

// var isDone = false;
// var timerCount = 20;
// var finalScore;
// var highscoresList = [];

// // exercise 20 for selectors
// // add event listeners
// startButton.addEventListener("click", startQuiz);
// submitButton.addEventListener("click", subInitials);
// backButton.addEventListener("click", goBack);
// scoresButton.addEventListener("click", viewScores);
// answersEl.addEventListener("click", recordAnswer); // temp

// // functions

// // goes from start to quiz
// function startQuiz() {
//     // reset
//     timerCount = 20;
//     currQuestion = 0;
//     isDone = false;
//     startTimer();
//     startSecEl.style.display = "none";
//     quizSecEl.style.display = "unset";
//     nextQuestion();
// }

// // goes from end to highscores
// function subInitials() {
//     endSecEl.style.display = "none";
//     scoreSecEl.style.display = "unset";
//     navEl.style.visibility = "hidden";
//     addHighscore();
// }

// // goes from highscores to start
// function goBack() {
//     scoreSecEl.style.display = "none";
//     startSecEl.style.display = "unset";
//     navEl.style.visibility = "visible";
// }

// // goes from any page to highscores
// function viewScores() {
//     startSecEl.style.display = "none";
//     quizSecEl.style.display = "none";
//     endSecEl.style.display = "none";
//     scoreSecEl.style.display = "unset";
//     navEl.style.visibility = "hidden";
// }

// function recordAnswer(event) {
//     var element = event.target;
//     if (element.matches("button")) {
//         //get number & add to user answers
//         userAnswer.push(element.getAttribute("number"));
//         //check if wrong & subtract time else say correct
//     }
//     nextQuestion();
// }

// // sets next question on page
// function nextQuestion() {
//     if (questionSet[currQuestion] === undefined) {
//         isDone = true;
//     } else {
//         questionEl.textContent = questionSet[currQuestion].question;
//         choice1El.textContent = questionSet[currQuestion].choice1;
//         choice2El.textContent = questionSet[currQuestion].choice2;
//         choice3El.textContent = questionSet[currQuestion].choice3;
//         choice4El.textContent = questionSet[currQuestion].choice4;
//         currQuestion++;
//     }
// }

// // function startTimer() {
// //     // Sets timer
// //     timer = setInterval(function() {
// //       timerCount--;
// //       timerElement.textContent = timerCount;
// //       if (timerCount >= 0) {
// //         // Tests if win condition is met
// //         if (isWin && timerCount > 0) {
// //           // Clears interval and stops timer
// //           clearInterval(timer);
// //           winGame();
// //         }
// //       }
// //       // Tests if time has run out
// //       if (timerCount === 0) {
// //         // Clears interval
// //         clearInterval(timer);
// //         loseGame();
// //       }
// //     }, 1000);
// //   }

// // function startTimer() {
// //     timer = setInterval(function() {
// //         timerEl.textContent = "Time: " + timerCount;
// //         timerCount--;
// //         if (timerCount > 0) {
// //             if (isDone) {
// //                 clearInterval(timer);
// //                 endQuiz();
// //             }
// //         }
// //         if (timerCount === 0) {
// //             clearInterval(timer);
// //             endQuiz();
// //         }
// //     }, 1000);
// // }



// function startTimer() {
//     timer = setInterval(function() {
//         timerEl.textContent = "Time: " + timerCount; // !!timer delay
//         timerCount--;
//         if (timerCount < 0) {
//             clearInterval(timer);
//             endQuiz(); // !!final score
//         }
//     }, 1000);
// }

// function endQuiz() {
//     finalScore = timerCount;
//     scoreEl.textContent = finalScore;
//     timerCount = 0;
//     timerEl.textContent = "Time: " + timerCount;
//     quizSecEl.style.display = "none";
//     endSecEl.style.display = "unset";
// }

// function addHighscore() {
//     var highscore = {
//         initials: initialInput.value,
//         score: finalScore
//     };
//     initialInput.value = ""; //prevent default
//     highscoresList.push(highscore);


//     // students.sort((a, b) => {
//     //     return b.age - a.age;
//     // });
//     // console.log(students);

//     highscoresList.sort((a, b) => {
//         return b.score - a.score;
//     });
//     console.log(highscoresList);
// }