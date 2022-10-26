// starters
questionElement.innerText = "";
image.style.visibility = "hidden";
let score = 0;

// event listeners
buttonStart.addEventListener("click", gameStart);
buttonNext.addEventListener("click", () => {
  currentQuestion++;
  nextQuestion();
});
buttonSkip.addEventListener("click", () => {
  currentQuestion++;
  stopTimerSound();
  nextQuestion();
  buttonSkip.style.display = "none";
});
buttonQuit.addEventListener("click", quit);

// functions
function gameStart() {
  console.log("started");
  document.querySelector(".goldbar").style.display = "none";
  buttonSkip.classList.remove("hide");
  questionShuffle = questions.sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  questionContainerDiv.classList.remove("hide");
  clearScore();
  nextQuestion();
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
  gameOver();
}

function answerSelect(e) {
  let selectedBtn = e.target;
  let correct = selectedBtn.dataset.correct;
  if (!correct) {
    gameOver();
  }
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
    rightAnswerAudio.volume = 0.3;
    buttonQuit.classList.add("hide");
    buttonSkip.classList.add("hide");
    scoreMeter();
  }
  if (!correct) {
    element.classList.add("incorrect");
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

function myStopFunction() {
  clearTimeout(timeoutId);
}

function gameOver() {
  stopTimerSound();
  wrongAnswerAudio.play();
  wrongAnswerAudio.volume = 0.3;
  buttonNext.style.display = "none";
  buttonQuit.classList.add("hide");
  buttonSkip.classList.add("hide");
  buttonStart.classList.remove("hide");
  buttonStart.innerText = "Restart";
  countDownTimer.innerText = "Game Over!";
  countDownTimer.style.color = "#8B0000";
  questionElement.innerText = "";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
  timeOut = setTimeout(() => {
    stopTimerSound();
  }, 4000);
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
    console.log("timer end");
    return interval;
  }, 100);
}

function startTimerSound() {
  timer();
  letsPlayAudio.play();
  letsPlayAudio.volume = 0.3;
  timeOutId = setTimeout(() => {
    easyAudio.play();
    easyAudio.volume = 0.3;
  }, 4000);
}

function stopTimerSound() {
  myStopFunction();
  clearInterval(intervalId);
  letsPlayAudio.pause();
  letsPlayAudio.currentTime = 0;
  easyAudio.pause();
  easyAudio.currentTime = 0;
}

function scoreMeter() {
  score += 100000;
  scoreKeeper.innerText = `Score: ${score} / 1000000`;
  if (score === 1000000) {
    countDownTimer.innerText = "Congratulations!";
    countDownTimer.style.color = "#DAA520";
    image.style.visibility = "visible";
    buttonNext.style.display = "none";
    buttonStart.classList.remove("hide");
    buttonStart.innerText = "Restart";
  }
}

function clearScore() {
  score = 0;
  scoreKeeper.innerText = `Score: ${score} / 1000000`;
  image.style.visibility = "hidden";
  countDownTimer.style.color = "black";
}

// unable to disable buttons
