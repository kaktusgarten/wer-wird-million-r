import quizQuestions from "./script-questions.js";

console.log(quizQuestions);
const startBtn = document.getElementById("startButton");
const preisstufenBox = document.getElementById("preisStufenBox");
const frage = document.getElementById("frage");
const antwortenWrapper = document.getElementById("antwortenWrapper");
const popupBtn = document.getElementsByClassName("popupBtn");

let preisstufen = document.getElementsByClassName("preisstufen");
let currentQuestion = 0;
// Variablen für Output
const beendenBtn = document.getElementById("beendenButton");
const output = document.getElementById("statusAusgabe");

let moneyIndex = 0;
const moneyArray = [
  "0",
  "50",
  "100",
  "200",
  "300",
  "500",
  "1.000",
  "2.000",
  "4.000",
  "8.000",
  "16.000",
  "31.999",
  "64.000",
  "125.000",
  "500.000",
  "1.000.000",
];
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
    document.getElementById("popupLose").style.cssText = `display:block`;
    Array.from(antwortenWrapper.children).forEach((child) =>
      child.classList.add("disabled")
    );
    // Output bei falscher Antwort
    switch (currentQuestion) {
      case currentQuestion <= 5:
        moneyIndex = 0;
        break;
      case currentQuestion <= 15:
        moneyIndex = 5;
        break;
      default:
        moneyIndex = 0;
    }
    output.textContent =
      "Schade, Sie haben verloren und gehen mit " +
      moneyArray[moneyIndex] +
      "\u20AC nach Hause!";
    beendenBtn.classList.add("disabled");
    return;
  }

  if (currentQuestion === 14) {
    document.getElementById("popupWin").style.cssText = `display:block`;
  }

  preisstufen[14 - currentQuestion].style.background = "red";
  preisstufen[14 - currentQuestion].style.paddingInline = "1rem";
  event.target.style.background = "green";

  Array.from(antwortenWrapper.children).forEach((child) =>
    child.classList.add("disabled")
  );
  currentQuestion++;
  // End Game if 15 Answers have been successfully given
  if (currentQuestion === 15) {
    output.textContent =
      "Herzlichen Glückwunsch! Sie gehen mit " +
      moneyArray[currentQuestion] +
      "\u20AC nach Hause!";
    Array.from(antwortenWrapper.children).forEach((child) =>
      child.classList.add("disabled")
    );
    beendenBtn.classList.add("disabled");
    return;
  }
  setTimeout(() => {
    Array.from(antwortenWrapper.children).forEach((child) =>
      child.classList.remove("disabled")
    );
    startGame();
  }, 3000);

  console.log("filteredArray", filteredArray);
};
const startGame = () => {
  antwortenWrapper.innerHTML = "";
  frage.textContent = quizQuestions[currentQuestion].question;
  beendenBtn.classList.remove("disabled");
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
popupBtn[0].addEventListener("click", resetGame);
popupBtn[1].addEventListener("click", resetGame);

function resetGame() {
  output.textContent = "Viel Spaß und Erfolg!";
  currentQuestion = 0;
  for (let i = 0; i < preisstufen.length; i++) {
    preisstufen[i].style.cssText = `background-color: none`;
  }
  document.getElementById("popupWin").style.cssText = `display:none`;
  document.getElementById("popupLose").style.cssText = `display:none`;

  startGame();
}

beendenBtn.addEventListener("click", () => {
  Array.from(antwortenWrapper.children).forEach((child) =>
    child.classList.add("disabled")
  );
  output.textContent =
    "Sie geben auf und gehen mit " +
    moneyArray[currentQuestion] +
    "\u20AC nach Hause!";
  beendenBtn.classList.add("disabled");
});

startGame();

checkAnswer();
