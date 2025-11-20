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

// Cargar preguntas desde la API
async function loadQuestions() {
    try {
        // url de la api
        let apiUrl = `https://opentdb.com/api.php?amount=${questionCount}`;
        
        if (category) {
            apiUrl += `&category=${category}`;
        }
        
        if (difficulty) {
            apiUrl += `&difficulty=${difficulty}`;
        }
        
        //para evitar problemas con los caracteres especiales
        apiUrl += '&encode=url3986';
        
        // peticion a la API
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Error al cargar las preguntas');
        }
        
        const data = await response.json();
        
        if (data.response_code !== 0) {
            throw new Error('No se pudieron obtener las preguntas');
        }
        
        questions = data.results;
        
        // Iniciar el juego
        startGameplay();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar las preguntas. Intentalo de nuevo.');
        // Volver a la pantalla de configuracion
        loadingScreen.classList.remove('active');
        setupScreen.classList.add('active');
    }
}

// Iniciar el juego
function startGameplay() {
    // Ocultar pantalla de carga y mostrar pantalla de juego
    loadingScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // Actualizar informacion del jugador
    currentPlayerSpan.textContent = playerName;
    totalQuestionsSpan.textContent = questions.length;
    
    // Reiniciar variables del juego
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    totalTimeSpent = 0;
    
    // Mostrar la primera pregunta
    showQuestion();
}

// Mostrar la pregunta actual
function showQuestion() {
    // Reiniciar temporizador
    timeLeft = 20;
    timerFill.style.width = '100%';
    timerFill.className = 'timer-fill';
    timerText.textContent = timeLeft;
    // Actualizar progreso
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    currentScoreSpan.textContent = score;
    
    // Obtener pregunta actual
    const currentQuestion = questions[currentQuestionIndex];
    
    // Decodificar texto de la pregunta
    questionText.textContent = decodeURIComponent(currentQuestion.question);
    
    // Mezclar y mostrar respuestas
    const allAnswers = [
        ...currentQuestion.incorrect_answers.map(answer => ({
            text: decodeURIComponent(answer),
            correct: false
        })),
        {
            text: decodeURIComponent(currentQuestion.correct_answer),
            correct: true
        }
    ];
    
    // Mezclar respuestas
    shuffleArray(allAnswers);
    
    // Limpiar contenedor de respuestas
    answersContainer.innerHTML = '';
    
    // Crear botones de respuestas
    allAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        answersContainer.appendChild(button);
    });
    
    // Iniciar temporizador
    startTimer();
}

// Mezclar array (algoritmo Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Iniciar temporizador
function startTimer() {
    // Limpiar temporizador anterior si existe
    if (timer) {
        clearInterval(timer);
    }
     // Actualizar temporizador cada segundo
    timer = setInterval(() => {
        timeLeft--;
        totalTimeSpent++;
        
        // Actualizar visualización del temporizador
        timerText.textContent = timeLeft;
        timerFill.style.width = `${(timeLeft / 20) * 100}%`;
        
        // Cambiar color cuando queden menos de 5 segundos
        if (timeLeft <= 5) {
            timerFill.classList.add('timer-danger');
        } else if (timeLeft <= 10) {
            timerFill.classList.add('timer-warning');
        }
        
        // Si se agota el tiempo
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeUp();
        }
    }, 1000);
}
// Manejar cuando se agota el tiempo
function handleTimeUp() {
    // Deshabilitar todos los botones de respuesta
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(button => {
        button.disabled = true;
        
        // Resaltar la respuesta correcta
        if (button.textContent === decodeURIComponent(questions[currentQuestionIndex].correct_answer)) {
            button.classList.add('correct');
        }
    });
    
    // Esperar un momento y pasar a la siguiente pregunta
    setTimeout(nextQuestion, 2000);
}

// Seleccionar una respuesta
function selectAnswer(button, isCorrect) {
    // Pausar el temporizador
    clearInterval(timer);
    
    // Deshabilitar todos los botones de respuesta
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => {
        btn.disabled = true;
        
        // Resaltar la respuesta correcta
        if (btn.textContent === decodeURIComponent(questions[currentQuestionIndex].correct_answer)) {
            btn.classList.add('correct');
        }
    });

    // Resaltar la respuesta seleccionada
    if (isCorrect) {
        // Respuesta correcta
        button.classList.add('correct');
        score += 10;
        correctAnswers++;
        currentScoreSpan.textContent = score;
    } else {
        // Respuesta incorrecta
        button.classList.add('incorrect');
    }
    
    // Esperar un momento y pasar a la siguiente pregunta
    setTimeout(nextQuestion, 2000);
}

// Pasar a la siguiente pregunta
function nextQuestion() {
    currentQuestionIndex++;
    
    // Verificar si es la ultima pregunta
    if (currentQuestionIndex >= questions.length) {
        showResults();
    } else {
        showQuestion();
    }
}

// Mostrar resultados finales
function showResults() {
    // Ocultar pantalla de juego y mostrar pantalla de resultados
    gameScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    // Calcular estadisticas
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    const averageTime = Math.round(totalTimeSpent / questions.length);
    
    // Mostrar resultados
    resultPlayerSpan.textContent = playerName;
    resultScoreSpan.textContent = score;
    resultCorrectSpan.textContent = correctAnswers;
    resultTotalSpan.textContent = questions.length;
    resultPercentageSpan.textContent = percentage;
    resultAverageTimeSpan.textContent = averageTime;
}

// Jugar otra vez 
function playAgain() {
    // Ocultar pantalla de resultados y mostrar pantalla de carga
    resultsScreen.classList.remove('active');
    loadingScreen.classList.add('active');
    
    // Cargar nuevas preguntas con la misma configuracion
    loadQuestions();
}

//comenzar nuevo juego
function changeSettings() {
    // Ocultar pantalla de resultados y mostrar pantalla de configuración
    resultsScreen.classList.remove('active');
    setupScreen.classList.add('active');
}

// Finalizar la aplicación
function endGame() {
    // Limpiar todo y recargar la pagina
    if (confirm('¿quieres terminar el juego?')) {
        location.reload();
    }
}
    

    