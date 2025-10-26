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

// se creo lo que se va a imprimir en una matriz
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