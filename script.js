import quizQuestions from "./script-questions.js";

console.log(quizQuestions);
const startBtn = document.getElementById("startButton");
const preisstufenBox = document.getElementById("preisStufenBox");
const frage = document.getElementById("frage");
const antwortenWrapper = document.getElementById("antwortenWrapper");

let preisstufen = document.getElementsByClassName("preisstufen");
let currentQuestion = 0;

const checkAnswer = (event) => {
  console.log(event.target);
  const filteredArray = quizQuestions[currentQuestion].answers.filter(
    (answer) =>
      event.target.textContent === answer.text && answer.correct === true
  );

  for (let i = 0; i < preisstufen.length; i++) {
    preisstufen[i].style.background = "inherit";
  }

  if (filteredArray.length === 0) {
    event.target.style.background = "red";
    console.log("no correct answer");
    // alert("Sie haben Verloren...");

    return;
  }
  preisstufen[14 - currentQuestion].style.background = "red";
  event.target.style.background = "green";
  currentQuestion++;
  setTimeout(() => {
    startGame();
  }, 3000);

  console.log("filteredArray", filteredArray);
};
const startGame = () => {
  antwortenWrapper.innerHTML = "";
  frage.textContent = quizQuestions[currentQuestion].question;

  quizQuestions[currentQuestion].answers.forEach((answer) => {
    const antwort = document.createElement("div");
    antwort.textContent = answer.text;
    antwortenWrapper.appendChild(antwort);
    antwort.addEventListener("click", (event) => {
      checkAnswer(event);
    });
  });
};

startBtn.addEventListener("click", resetGame);

function resetGame() {
  currentQuestion = 0;
  for (let i = 0; i < preisstufen.length; i++) {
    preisstufen[i].style.cssText = `background-color: none`;
  }
  startGame();
}
startGame();

checkAnswer();
