const question = [
  {
    question: "What is the capital of France?",
    answer: [
      { text: "Kathmandu", correct: false },
      { text: "Tokyo", correct: false },
      { text: "Paris", correct: true },
      { text: "Melbourn", correct: false },
    ],
  },
  {
    question: "What is 12 multiplied by 8?",
    answer: [
      { text: "92", correct: false },
      { text: "96", correct: true },
      { text: "100", correct: false },
      { text: "104", correct: false },
    ],
  },
  {
    question: "What is the symbol for gold in the periodic table?",
    answer: [
      { text: "Ag", correct: false },
      { text: "Au", correct: true },
      { text: "Pb", correct: false },
      { text: "Fe", correct: false },
    ],
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answer: [
      { text: "China", correct: false },
      { text: "Japan", correct: true },
      { text: "India", correct: false },
      { text: "South Korea", correct: false },
    ],
  },
  {
    question: "Which country is home to Mount Everest?",
    answer: [
      { text: "China", correct: false },
      { text: "Nepal", correct: true },
      { text: "India", correct: false },
      { text: "Tibet", correct: false },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();

  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `Your scored ${score} out of ${question.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handledNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < question.length) {
    handledNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
