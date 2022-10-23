//constants and variables
const buttonStart = document.getElementById("start-btn");
const buttonNext = document.getElementById("next-btn");
const buttonQuit = document.getElementById("quit-btn");
const buttonSkip = document.getElementById("skip-btn");
const questionContainerDiv = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const scoreKeeper = document.getElementById("score");
const letsPlayAudio = document.getElementById("lets-play");
const easyAudio = document.getElementById("easy");
const wrongAnswerAudio = document.getElementById("wrong-answer");
const rightAnswerAudio = document.getElementById("right-answer");
const countDownTimer = document.getElementById("timer");
const disabledButton = document.getElementById("answer");

let questionShuffle, currentQuestion;
let intervalId;
let timeoutId;
