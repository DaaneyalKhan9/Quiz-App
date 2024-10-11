const questions = {
    capitals: [
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false },
                { text: "Paris", correct: true },
                { text: "Rome", correct: false }
            ]
        },
        {
            question: "What is the capital of Japan?",
            answers: [
                { text: "Seoul", correct: false },
                { text: "Tokyo", correct: true },
                { text: "Beijing", correct: false },
                { text: "Bangkok", correct: false }
            ]
        },
        {
            question: "What is the capital of Italy?",
            answers: [
                { text: "Venice", correct: false },
                { text: "Milan", correct: false },
                { text: "Rome", correct: true },
                { text: "Florence", correct: false }
            ]
        },
        {
            question: "What is the capital of Canada?",
            answers: [
                { text: "Toronto", correct: false },
                { text: "Ottawa", correct: true },
                { text: "Vancouver", correct: false },
                { text: "Montreal", correct: false }
            ]
        },
        {
            question: "What is the capital of Australia?",
            answers: [
                { text: "Sydney", correct: false },
                { text: "Canberra", correct: true },
                { text: "Melbourne", correct: false },
                { text: "Brisbane", correct: false }
            ]
        }
    ],
    general: [
        {
            question: "Who wrote 'Hamlet'?",
            answers: [
                { text: "Mark Twain", correct: false },
                { text: "William Shakespeare", correct: true },
                { text: "Charles Dickens", correct: false },
                { text: "Jane Austen", correct: false }
            ]
        },
        {
            question: "What is the largest planet in our solar system?",
            answers: [
                { text: "Earth", correct: false },
                { text: "Jupiter", correct: true },
                { text: "Mars", correct: false },
                { text: "Saturn", correct: false }
            ]
        },
        {
            question: "What is the boiling point of water?",
            answers: [
                { text: "100°C", correct: true },
                { text: "90°C", correct: false },
                { text: "110°C", correct: false },
                { text: "80°C", correct: false }
            ]
        },
        {
            question: "What is the currency of Japan?",
            answers: [
                { text: "Yen", correct: true },
                { text: "Won", correct: false },
                { text: "Dollar", correct: false },
                { text: "Yuan", correct: false }
            ]
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: [
                { text: "Earth", correct: false },
                { text: "Venus", correct: false },
                { text: "Mars", correct: true },
                { text: "Jupiter", correct: false }
            ]
        }
    ],
    custom: [
        {
            question: "What is the chemical symbol for Gold?",
            answers: [
                { text: "Au", correct: true },
                { text: "Ag", correct: false },
                { text: "Pb", correct: false },
                { text: "Fe", correct: false }
            ]
        },
        {
            question: "What is the capital of Australia?",
            answers: [
                { text: "Canberra", correct: true },
                { text: "Sydney", correct: false },
                { text: "Melbourne", correct: false },
                { text: "Brisbane", correct: false }
            ]
        },
        {
            question: "What gas do plants absorb from the atmosphere?",
            answers: [
                { text: "Oxygen", correct: false },
                { text: "Nitrogen", correct: false },
                { text: "Carbon Dioxide", correct: true },
                { text: "Hydrogen", correct: false }
            ]
        },
        {
            question: "What is the largest mammal in the world?",
            answers: [
                { text: "Elephant", correct: false },
                { text: "Blue Whale", correct: true },
                { text: "Giraffe", correct: false },
                { text: "Great White Shark", correct: false }
            ]
        },
        {
            question: "Which element has the highest atomic number?",
            answers: [
                { text: "Osmium", correct: false },
                { text: "Uranium", correct: false },
                { text: "Ununoctium", correct: true },
                { text: "Hydrogen", correct: false }
            ]
        }
    ]
};

let currentQuestionIndex, score;
const scoreText = document.getElementById('score');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const backButton = document.getElementById('back-button');
const quizContainer = document.querySelector('.quiz-container');
const quizSelectionContainer = document.querySelector('.quiz-selection-container');
const progressFill = document.getElementById('progress-fill');

// Event listeners for starting the quiz
document.getElementById('start-capitals').addEventListener('click', () => startQuiz('capitals'));
document.getElementById('start-general').addEventListener('click', () => startQuiz('general'));
document.getElementById('start-custom').addEventListener('click', () => startQuiz('custom'));

// Back button functionality
backButton.addEventListener('click', () => {
    quizContainer.style.display = 'none'; // Hide quiz container
    quizSelectionContainer.style.display = 'flex'; // Show quiz selection
    backButton.style.display = 'none'; // Hide back button when returning to selection
});

// Function to start the quiz
function startQuiz(quizType) {
    quizContainer.style.display = 'flex'; // Show the quiz container
    quizSelectionContainer.style.display = 'none'; // Hide quiz selection
    score = 0; // Reset score
    currentQuestionIndex = 0; // Reset question index
    progressFill.style.width = '0%'; // Reset progress bar
    scoreText.innerText = `${score} / ${questions[quizType].length}`; // Update score display
    showQuestion(quizType); // Show first question
}

// Function to display a question
function showQuestion(quizType) {
    const currentQuestion = questions[quizType][currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    answerButtons.innerHTML = ''; // Clear previous answers

    // Create buttons for each answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer.correct, quizType)); // Check answer
        answerButtons.appendChild(button); // Add button to answer buttons
    });

    nextButton.style.display = 'none'; // Hide next button initially
}

// Function to handle answer selection
function selectAnswer(correct, quizType) {
    if (correct) {
        score++; // Increment score if answer is correct
    }
    scoreText.innerText = `${score} / ${questions[quizType].length}`; // Update score display
    progressFill.style.width = `${((currentQuestionIndex + 1) / questions[quizType].length) * 100}%`; // Update progress bar

    nextButton.style.display = 'block'; // Show the next button
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true; // Disable all answer buttons
        button.style.backgroundColor = correct ? 'green' : 'red'; // Color correct/incorrect buttons
    });
}

// Event listener for next button
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    const quizType = Object.keys(questions).find(type => questions[type].length > 0);
    if (currentQuestionIndex < questions[quizType].length) {
        showQuestion(quizType); // Show next question
    } else {
        endQuiz(quizType); // End the quiz
    }
});

// Function to end the quiz
function endQuiz(quizType) {
    quizContainer.style.display = 'none'; // Hide quiz container
    alert(`Quiz finished! Your score: ${score} / ${questions[quizType].length}`); // Show alert with score
    backButton.style.display = 'block'; // Show the back button
    quizSelectionContainer.style.display = 'flex'; // Show quiz selection again
    scoreText.innerText = `${score} / ${questions[quizType].length}`; // Display final score
}












