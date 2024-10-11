const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false }
        ]
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "4", correct: true },
            { text: "22", correct: false },
            { text: "5", correct: false },
            { text: "3", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Jupiter", correct: true },
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true },
            { text: "O2", correct: false },
            { text: "CO2", correct: false },
            { text: "He", correct: false }
        ]
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: [
            { text: "China", correct: false },
            { text: "Japan", correct: true },
            { text: "Thailand", correct: false },
            { text: "South Korea", correct: false }
        ]
    },
    {
        question: "What is the main language spoken in Brazil?",
        answers: [
            { text: "Spanish", correct: false },
            { text: "Portuguese", correct: true },
            { text: "English", correct: false },
            { text: "French", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Saturn", correct: false },
            { text: "Mercury", correct: false }
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Diamond", correct: true },
            { text: "Iron", correct: false },
            { text: "Quartz", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "What is the capital of Italy?",
        answers: [
            { text: "Rome", correct: true },
            { text: "Milan", correct: false },
            { text: "Venice", correct: false },
            { text: "Florence", correct: false }
        ]
    },
];

let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById("start-button");
const quizContainer = document.querySelector(".quiz-container");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);

function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "flex";
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = "0 / 10";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
    updateProgressBar(); // Update the progress bar whenever a question is shown
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
    }
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.style.display = "block";
    } else {
        nextButton.innerText = "Finish Quiz";
        nextButton.style.display = "block";
    }
    updateProgressBar(); // Update the progress bar on correct answer
}

function setStatusClass(element, correct) {
    element.style.backgroundColor = correct ? "#28a745" : "#dc3545";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        quizContainer.style.display = "none";
        startButton.innerText = "Restart Quiz";
        startButton.style.display = "block";
        alert(`Quiz completed! Your score: ${score}/10`);
    }
    scoreElement.innerText = `${score} / 10`;
}

// Function to update the progress bar
function updateProgressBar() {
    const progressFill = document.getElementById("progress-fill");
    const totalQuestions = questions.length;
    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    progressFill.style.width = `${progressPercentage}%`; // Update the width of the progress fill
}






