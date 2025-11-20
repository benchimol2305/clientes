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
