const buttonStart = document.getElementById("start-btn");
const buttonContinue = document.getElementById("continue-btn");
const buttonGiveUp = document.getElementById("giveup-btn");
const buttonSkip = document.getElementById("skip-btn");
const questionContainerDiv = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");

let questionShuffle, currentQuestion;

buttonStart.addEventListener("click", gameStart);
buttonContinue.addEventListener("click", () => {
  currentQuestion++;
  nextQuestion();
});
buttonSkip.addEventListener("click", () => {
  currentQuestion++;
  nextQuestion();
  buttonSkip.style.display = "none";
});

function gameStart() {
  console.log("started");
  buttonSkip.classList.remove("hide");
  questionShuffle = questions.sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  questionContainerDiv.classList.remove("hide");
  nextQuestion();
}

function nextQuestion() {
  stateReset();
  questionShow(questionShuffle[currentQuestion]);
  buttonStart.classList.add("hide");
  buttonGiveUp.classList.remove("hide");
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

function giveUp() {}

function answerSelect(e) {
  let selectedBtn = e.target;
  let correct = selectedBtn.dataset.correct;
  statusClassSet(document.body, correct);
  Array.from(answerButton.children).forEach((button) => {
    statusClassSet(button, button.dataset.correct);
  });
  if (questionShuffle.length > currentQuestion + 1) {
    buttonContinue.classList.remove("hide");
  } else {
    buttonStart.innerText = "Restart";
    buttonStart.classList.remove("hide");
  }
}

function statusClassSet(element, correct) {
  clearStatus(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("incorrect");
  }
}

function clearStatus(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

function stateReset() {
  clearStatus(document.body);
  buttonContinue.classList.add("hide");
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

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

// needs to add functionality to the giveup button, needs to add score meter and needs to add more questions
