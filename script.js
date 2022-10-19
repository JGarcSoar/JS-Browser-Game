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

let questionShuffle, currentQuestion;

questionElement.innerText = "";

//event listeners
buttonStart.addEventListener("click", gameStart);
buttonNext.addEventListener("click", () => {
  currentQuestion++;
  nextQuestion();
});
buttonSkip.addEventListener("click", () => {
  currentQuestion++;
  nextQuestion();
  buttonSkip.style.display = "none";
});
buttonQuit.addEventListener("click", quit);

//functions
function gameStart() {
  console.log("started");
  buttonSkip.classList.remove("hide");
  questionShuffle = questions.sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  questionContainerDiv.classList.remove("hide");
  nextQuestion();
  startTimerSound();
}

function nextQuestion() {
  stateReset();
  questionShow(questionShuffle[currentQuestion]);
  buttonStart.classList.add("hide");
  buttonQuit.classList.remove("hide");
  startTimerSound();
}

function questionShow(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", answerSelect);
    answerButton.appendChild(button);
  });
}

function quit() {
  clearStatus(document.body);
  buttonStart.classList.remove("hide");
  buttonNext.classList.add("hide");
  buttonSkip.classList.add("hide");
  buttonQuit.classList.add("hide");
  questionElement.innerText = "";
  stopTimerSound();
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function answerSelect(e) {
  let selectedBtn = e.target;
  let correct = selectedBtn.dataset.correct;
  statusClassSet(document.body, correct);
  Array.from(answerButton.children).forEach((button) => {
    statusClassSet(button, button.dataset.correct);
  });
  if (questionShuffle.length > currentQuestion + 1) {
    buttonNext.classList.remove("hide");
  } else {
    buttonStart.innerText = "Restart";
    buttonStart.classList.remove("hide");
  }
}

function statusClassSet(element, correct) {
  clearStatus(element);
  if (correct) {
    element.classList.add("correct");
    stopTimerSound();
    rightAnswerAudio.play();
  } else {
    element.classList.add("incorrect");
    gameOver();
  }
}

function clearStatus(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

function stateReset() {
  clearStatus(document.body);
  buttonNext.classList.add("hide");
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function timer() {
  currentTime = new Date().getTime();
  intervalId = setInterval(() => {
    const interval = Math.floor(
      (40000 + currentTime - new Date().getTime()) / 1000
    );
    countDownTimer.textContent = interval;
    if (interval === 0) {
      clearInterval(intervalId);
      gameOver();
    }

    return interval;
  }, 100);
}

function startTimerSound() {
  timer();
  letsPlayAudio.play();
  letsPlayAudio.volume = 0.3;
  timeoutId = setTimeout(() => {
    easyAudio.play();
    easyAudio.volume = 0.3;
  }, 4000);
}

function stopTimerSound() {
  clearTimeout(timeoutId);
  clearInterval(intervalId);
  letsPlayAudio.pause();
  letsPlayAudio.currentTime = 0;
  easyAudio.pause();
  easyAudio.currentTime = 0;
  wrongAnswerAudio.pause();
  wrongAnswerAudio.currentTime = 0;
  rightAnswerAudio.pause();
  rightAnswerAudio.currentTime = 0;
}

function gameOver() {
  stopTimerSound();
  wrongAnswerAudio.play();
  wrongAnswerAudio.volume = 0.3;
}

// question list
const questions = [
  {
    question: "What is 2 / 2?",
    answers: [
      { text: "1", correct: true },
      { text: "2", correct: false },
      { text: "64", correct: false },
      { text: "32", correct: false },
    ],
  },
  {
    question: "What is 2 * 2?",
    answers: [
      { text: "4", correct: true },
      { text: "8", correct: false },
    ],
  },
  {
    question: "What is 2 - 2?",
    answers: [
      { text: "0", correct: true },
      { text: "-2", correct: false },
    ],
  },
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "34", correct: false },
    ],
  },
];

// add more questions, fix the sound issues and add gameover rules
