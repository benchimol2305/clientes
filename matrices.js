let tipo_de_matriz = 3;
let matrizA = [];
let matrizB = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeMatrices();
    setupEventListeners();
});

function initializeMatrices() {
    const raw = document.getElementById('tipo_de_matriz').value;
    tipo_de_matriz = parseInt(raw, 10);
    createMatrixInputs('matriz_a', tipo_de_matriz);
    createMatrixInputs('matriz_b', tipo_de_matriz);
    matrizA = createEmptyMatriz(tipo_de_matriz);
    matrizB = createEmptyMatriz(tipo_de_matriz);
}

function createMatrixInputs(containerId, size) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gap = '1px'; 
    
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
        tipo_de_matriz = parseInt(this.value, 10);
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
    const applyBtn = document.getElementById('apply-scalar') || document.getElementById('aplicar-escalar');
    if (applyBtn) applyBtn.addEventListener('click', () => performOperation('scalar'));
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
    matrizA = createEmptyMatriz(tipo_de_matriz);
    matrizB = createEmptyMatriz(tipo_de_matriz);
    updateMatrixInputs();
    clearResult();
}

function loadExampleMatrix() {
    tipo_de_matriz = 3;
    document.getElementById('tipo_de_matriz').value = tipo_de_matriz;
    matrizA = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    matrizB = [
        [9, 8, 7],
        [6, 5, 4],
        [3, 2, 1]
    ];

    createMatrixInputs('matriz_a', tipo_de_matriz);
    createMatrixInputs('matriz_b', tipo_de_matriz);
    updateMatrixInputs();
}

function updateMatricesFromInputs() {
    const inputsA = document.querySelectorAll('#matriz_a input');
    const inputsB = document.querySelectorAll('#matriz_b input');

    matrizA = createEmptyMatriz(tipo_de_matriz);
    matrizB = createEmptyMatriz(tipo_de_matriz);
    
    inputsA.forEach(input => {
        const row = parseInt(input.dataset.row, 10);
        const col = parseInt(input.dataset.col, 10);
        const v = parseFloat(input.value);
        matrizA[row][col] = isNaN(v) ? 0 : v;
    });
    
    inputsB.forEach(input => {
        const row = parseInt(input.dataset.row, 10);
        const col = parseInt(input.dataset.col, 10);
        const v = parseFloat(input.value);
        matrizB[row][col] = isNaN(v) ? 0 : v;
    });
}
function updateMatrixInputs() {
    const inputsA = document.querySelectorAll('#matriz_a input');
    const inputsB = document.querySelectorAll('#matriz_b input');

    inputsA.forEach(input => {
        const row = parseInt(input.dataset.row, 10);
        const col = parseInt(input.dataset.col, 10);
        if (matrizA[row] && typeof matrizA[row][col] !== 'undefined') {
            input.value = formatNumber(matrizA[row][col]);
        } else {
            input.value = '0';
        }
    });

    inputsB.forEach(input => {
        const row = parseInt(input.dataset.row, 10);
        const col = parseInt(input.dataset.col, 10);
        if (matrizB[row] && typeof matrizB[row][col] !== 'undefined') {
            input.value = formatNumber(matrizB[row][col]);
        } else {
            input.value = '0';
        }
    });
}

function showScalarInput() {
    document.getElementById('scalar-input-container').style.display = 'flex';
}
function performOperation(operation) {
    updateMatricesFromInputs();
    clearResult();
    
    try {
        let result;
        
        switch(operation) {
            case 'add':
                result = addMatrices(matrizA, matrizB);
                displayMatrixResult(result, 'A + B');
                break;
                
            case 'subtract':
                result = subtractMatrices(matrizA, matrizB);
                displayMatrixResult(result, 'A - B');
                break;
            case 'multiply':
                result = multiplyMatrices(matrizA, matrizB);
                displayMatrixResult(result, 'A × B');
                break;
                
            case 'scalar':
                const scalar = parseFloat(document.getElementById('scalar-value').value);
                if (isNaN(scalar)) {
                    throw new Error('El valor escalar debe ser un numero');
                }
                result = scalarMultiply(matrizA, scalar);
                displayMatrixResult(result, `${scalar} × A`);
                document.getElementById('scalar-input-container').style.display = 'none';
                break;
                
            case 'transpose':
                result = transposeMatrix(matrizA);
                displayMatrixResult(result, 'Transpuesta de A');
                break;
            case 'determinant':
                const det = calculateDeterminant(matrizA);
                displayTextResult(`det(A) = ${formatNumber(det)}`);
                break;
                
            case 'inverse':
                result = inverseMatrix(matrizA);
                displayMatrixResult(result, 'Inversa de A');
                break;
                
            case 'identity':
                result = createIdentityMatrix(tipo_de_matriz);
                displayMatrixResult(result, `Matriz Identidad ${tipo_de_matriz}×${tipo_de_matriz}`);
                break;
        }
    } catch (error) {
        displayError(error.message);
    }
}


// Suma
function addMatrices(a, b) {
    if (a.length !== b.length || a[0].length !== b[0].length) {
        throw new Error('Las matrices deben tener las mismas dimensiones para sumarlas');
    }

    const result = createEmptyMatriz(a.length);

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[0].length; j++) {
            result[i][j] = a[i][j] + b[i][j];
        }
    }
    
    return result;
}

// Resta de matrices
function subtractMatrices(a, b) {
    if (a.length !== b.length || a[0].length !== b[0].length) {
        throw new Error('Las matrices deben tener las mismas dimensiones para restarlas');
    }
    const result = createEmptyMatriz(a.length);
    
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[0].length; j++) {
            result[i][j] = a[i][j] - b[i][j];
        }
    }
    
    return result;
}

// Multiplicacion
function multiplyMatrices(a, b) {
    if (a[0].length !== b.length) {
        throw new Error('El numero de columnas de A debe ser igual al numero de filas de B');
    }

    const result = createEmptyMatriz(a.length);
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < a[0].length; k++) {
                sum += a[i][k] * b[k][j];
            }
            result[i][j] = sum;
        }
    }
    
    return result;
}

// escalar
function scalarMultiply(matrix, scalar) {
    const result = createEmptyMatriz(matrix.length);
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            result[i][j] = matrix[i][j] * scalar;
        }
    }

    return result;
}

// Transposicion
function transposeMatrix(matrix) {
    const result = createEmptyMatriz(matrix[0].length);
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    
    return result;
}

// determinante
function calculateDeterminant(matrix) {
    if (matrix.length !== matrix[0].length) {
        throw new Error('La matriz debe ser cuadrada para calcular el determinante');
    }
    return determinant(matrix);
}

// Funcion para calcular determinante
function determinant(matrix) {
    const size = matrix.length;

    //matriz 1x1
    if (size === 1) {
        return matrix[0][0];
    }
    
    //matriz 2x2
    if (size === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    // Cofactores para matrices más grandes
    let det = 0;
    for (let j = 0; j < size; j++) {
        const minor = getMinor(matrix, 0, j);
        det += matrix[0][j] * Math.pow(-1, j) * determinant(minor);
        }
    
    return det;
}

// Obtiene el menor
function getMinor(matrix, row, col) {
    const minor = [];
    const size = matrix.length;
    
    for (let i = 0, m = 0; i < size; i++) {
        if (i === row) continue;
        minor[m] = [];
        for (let j = 0, n = 0; j < size; j++) {
            if (j === col) continue;
            minor[m][n] = matrix[i][j];
            n++;
        }
        m++;
    }
    
    return minor;
}
function inverseMatrix(matrix) {
    const det = calculateDeterminant(matrix);
    
    if (det === 0) {
        throw new Error('La matriz no es invertible (determinante = 0)');
    }
    
    const size = matrix.length;
    
    // Matriz de cofactores
    const cofactors = createEmptyMatriz(size);
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const minor = getMinor(matrix, i, j);
            cofactors[i][j] = Math.pow(-1, i + j) * determinant(minor);
        }
    }
    
 // Matriz adjunta 
    const adjugate = transposeMatrix(cofactors);
    
    // Matriz inversa
    const inverse = scalarMultiply(adjugate, 1 / det);
    
    return inverse;
}

// Crea una matriz identidad
function createIdentityMatrix(size) {
    const identity = createEmptyMatriz(size);
    
    for (let i = 0; i < size; i++) {
        identity[i][i] = 1;
    }
    
    return identity;
}

// Muestra la matriz
function displayMatrixResult(matrix, operation) {
    const container = document.getElementById('result-matrix');
    const text = document.getElementById('result-text');
    
    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${matrix.length}, 1fr)`;
    container.style.gap = '8px';
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            const cell = document.createElement('div');
            cell.className = 'result-cell';
            cell.textContent = formatNumber(matrix[i][j]);
            container.appendChild(cell);
        }
    }
    
    text.textContent = operation;
}
function displayTextResult(text) {
    document.getElementById('result-text').textContent = text;
    document.getElementById('result-matrix').innerHTML = '';
}

function displayError(message) {
    document.getElementById('error-message').textContent = message;
}

// Limpia el are 
function clearResult() {
    document.getElementById('result-matrix').innerHTML = '';
    document.getElementById('result-text').textContent = '';
    document.getElementById('error-message').textContent = '';
}
// Formatea numeros 
function formatNumber(num) {
    if (Math.abs(num) < 0.0001) num = 0; // Evita números muy pequeños
    return parseFloat(num.toFixed(4)).toString();
}
