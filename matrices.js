let tipo_de_matriz = 3;
let matrizA = [];
let matrizB = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeMatrices();
    setupEventListeners();
});

function initializeMatrices() {
    tipo_de_matriz = parseInt(document.getElementById('tipo_de_matriz').value);
    createMatrixInputs('matriz_a', tipo_de_matriz);
    createMatrixInputs('matriz_b', tipo_de_matriz);
    matrizA = createEmptyMatrix(tipo_de_matriz);
    matrizB = createEmptyMatrix(tipo_de_matriz);
}

function createMatrixInputs(containerId, size) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'matrix-cell';
            input.dataset.row = i;
            input.dataset.col = j;
            input.value = i === j ? '1' : '0'; // Matriz identidad por defecto
            container.appendChild(input);
        }
    }
}

function createEmptyMatriz(size) {
    const matriz = [];
    for (let i = 0; i < size; i++) {
        matriz[i] = [];
        for (let j = 0; j < size; j++) {
            matriz[i][j] = 0;
        }
    }
    return matriz;
}
function setupEventListeners() {
    // Cambio de tamano de matriz
    document.getElementById('tipo_de_matriz').addEventListener('change', function() {
        tipo_de_matriz = parseInt(this.value);
        initializeMatrices();
    });
    
    // Botones de control
    document.getElementById('matriz_aleatoria').addEventListener('click', generateRandomMatrix);
    document.getElementById('clean_matriz').addEventListener('click', clearMatrices);
    document.getElementById('ejemplo_de_matriz').addEventListener('click', loadExampleMatrix);
    
    // Botones de operaciones
    document.getElementById('agg-matrices').addEventListener('click', () => performOperation('add'));
    document.getElementById('sustraer-matrices').addEventListener('click', () => performOperation('subtract'));
    document.getElementById('multiplicar-matrices').addEventListener('click', () => performOperation('multiply'));
    document.getElementById('multiplicacion-escalar').addEventListener('click', showScalarInput);
    document.getElementById('aplicar-escalar').addEventListener('click', () => performOperation('scalar'));
    document.getElementById('transponer-a').addEventListener('click', () => performOperation('transpose'));
    document.getElementById('determinante-a').addEventListener('click', () => performOperation('determinant'));
    document.getElementById('inversa-a').addEventListener('click', () => performOperation('inverse'));
    document.getElementById('matriz-identidad').addEventListener('click', () => performOperation('identity'));
}
function generateRandomMatrix() {
    updateMatricesFromInputs();

    for (let i = 0; i < tipo_de_matriz; i++) {
        for (let j = 0; j < tipo_de_matriz; j++) {
            matrizA[i][j] = Math.floor(Math.random() * 21) - 10; 
            matrizB[i][j] = Math.floor(Math.random() * 21) - 10;
        }
    }
    
    updateMatrixInputs();
}
// para limpiar la matriz
function clearMatrices() {
    matrizA = createEmptyMatrix(tipo_de_matriz);
    matrizB = createEmptyMatrix(tipo_de_matriz);
    updateMatrixInputs();
    clearResult();
}
