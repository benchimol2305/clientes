// variables del juego
let playerName = '';
let questionCount = 10;
let difficulty = '';
let category = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let timer;
let timeLeft = 20;
let totalTimeSpent = 0;
let categories = [];

// elementos del DOM
const setupScreen = document.getElementById('setup-screen');
const loadingScreen = document.getElementById('loading-screen');
const gameScreen = document.getElementById('game-screen');
const resultsScreen = document.getElementById('results-screen');
const gameSetupForm = document.getElementById('game-setup');
const playerNameInput = document.getElementById('player-name');
const questionCountInput = document.getElementById('question-count');
const difficultySelect = document.getElementById('difficulty');
const categorySelect = document.getElementById('category');
const startGameButton = document.getElementById('start-game');
const currentPlayerSpan = document.getElementById('current-player');
const currentScoreSpan = document.getElementById('current-score');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const timerFill = document.getElementById('timer-fill');
const timerText = document.getElementById('timer-text');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const resultPlayerSpan = document.getElementById('result-player');
const resultScoreSpan = document.getElementById('result-score');
const resultCorrectSpan = document.getElementById('result-correct');
const resultTotalSpan = document.getElementById('result-total');
const resultPercentageSpan = document.getElementById('result-percentage');
const resultAverageTimeSpan = document.getElementById('result-average-time');
const playAgainButton = document.getElementById('play-again');
const changeSettingsButton = document.getElementById('change-settings');
const endGameButton = document.getElementById('end-game');

// inicializar el juego cuando de cargue la pagiina

document.addEventListener('DOMContentLoaded', function() {
    // Cargar categorías de la API
    loadCategories();

    gameSetupForm.addEventListener('submit', startGame);
    playAgainButton.addEventListener('click', playAgain);
    changeSettingsButton.addEventListener('click', changeSettings);
    endGameButton.addEventListener('click', endGame);
    
    playerNameInput.addEventListener('input', validatePlayerName);
}); 


// Cargar categorias desde la API
async function loadCategories() {
    try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        categories = data.trivia_categories;
        
        // Llenar el selector de categorias con al menos 5 opciones
        categories.slice(0, 10).forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar categorias:', error);
        // si hay error, mostrar las que hay por defecto
        const defaultCategories = [
            { id: 9, name: 'Conocimientos generales' },
            { id: 10, name: 'Entretenimiento: Libros' },
            { id: 11, name: 'Entretenimiento: Cine' },
            { id: 12, name: 'Entretenimiento: Musica' },
            { id: 17, name: 'Ciencia y Naturaleza' }
        ];
        
        defaultCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });
    }
}

// Validar el nombre del jugador
function validatePlayerName() {
    const name = playerNameInput.value.trim();
    const nameError = document.getElementById('name-error');
    
    if (name.length < 2) {
        nameError.textContent = 'El nombre debe tener al menos 2 caracteres';
        return false;
    } else if (name.length > 20) {
        nameError.textContent = 'El nombre no puede tener mas de 20 caracteres';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

// Iniciar el juego
function startGame(event) {
    event.preventDefault();
    
    // Validar el nombre del jugador
    if (!validatePlayerName()) {
        return;
    }

     // se obtienen los valores del formulario
    playerName = playerNameInput.value.trim();
    questionCount = parseInt(questionCountInput.value);
    difficulty = difficultySelect.value;
    category = categorySelect.value;
    
    // muestrar pantalla de carga
    setupScreen.classList.remove('active');
    loadingScreen.classList.add('active');
    
    // se cargan las preguntas de la API
    loadQuestions();
}