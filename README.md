# Calculadora de Matrices

Un proyecto que permite crear editar y operar con matrices cuadradas

## Descripción
Interfaz minimalista para:
- editar dos matrices (A y B)
- operaciones: suma, resta, multiplicación, multiplicación por escalar, transpuesta, determinante, inversa, matriz identidad
- generar matrices aleatorias y limpiar entradas
- mostrar resultado en una cuadrícula

Archivos principales:
- `matrices.html` — interfaz HTML
- `matrices.css`  — estilos
- `matrices.js`   — lógica de matrices (creación, lectura, operaciones, renderizado)

## Como ejecutar
1. Abrir `matrices.html` directamente en el navegador (doble clic)  
   o, clonar el proyecto localmente para evitar restricciones:
   - Con Python (Windows):
     - Abrir terminal en la carpeta del proyecto:
       py -m http.server 8000
     - Abrir: http://localhost:8000/matrices.html

2. Usar los controles:
   - Seleccionar tamaño
   - Editar celdas de Matriz A y Matriz B
   - Usar botones para operaciones
   - Para multiplicación por escalar: hacer clic en "Escalar × A", introducir valor y "Aplicar"

## Operaciones a realizar
- A + B
- A - B
- A × B
- Escalar × A
- Transpuesta A
- Determinante A (solo matrices cuadradas)
- Inversa A
- Matriz Identidad

## Autor
Proyecto de práctica — César Benchimol

