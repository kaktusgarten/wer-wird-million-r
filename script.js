import quizQuestions from "./script-questions.js";

console.log(quizQuestions);
const startBtn = document.getElementById("startButton");
const stopBtn = document.getElementById("endButton");
const preisstufenBox = document.getElementById("preisStufenBox");
const frage = document.getElementById("frage");
const antwortenWrapper = document.getElementById("antwortenWrapper");

let currentQuestion = 0;

const checkAnswer = event => {
  console.log(event.target);
  const filteredArray = quizQuestions[currentQuestion].answers.filter(
    answer =>
      event.target.textContent === answer.text && answer.correct === true
  );

  if (filteredArray.length === 0) {
    event.target.style.background = "red";
    console.log("no correct answer");
    // alert("das Spiel ist beendet");

    return;
  }

  event.target.style.background = "green";
  currentQuestion++;
  setTimeout(() => {
    antwortenWrapper.innerHTML = "";
    startGame();
  }, 3000);

  console.log("filteredArray", filteredArray);
};
const startGame = () => {
  frage.textContent = quizQuestions[currentQuestion].question;

  quizQuestions[currentQuestion].answers.forEach(answer => {
    const antwort = document.createElement("div");
    antwort.textContent = answer.text;
    antwortenWrapper.appendChild(antwort);
    antwort.addEventListener("click", event => {
      checkAnswer(event);
    });
  });
};

startBtn.addEventListener("click", startGame);

startGame();

checkAnswer();
