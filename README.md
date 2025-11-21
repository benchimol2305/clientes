# Juego de Trivia Interactivo 

Un juego de trivia web interactivo que consume preguntas de una API externa y pone a prueba tus conocimientos generales.

##  Descripción

Este es un juego de trivia desarrollado con HTML, CSS y JavaScript que:
- Consume la API de Open Trivia Database
- Implementa programación asíncrona
- Ofrece una experiencia de usuario dinámica y atractiva
- Incluye temporizador, sistema de puntuación y estadísticas

## ✨ Características

### 🎯 Configuración del Juego
- **Nombre del jugador**: Campo obligatorio (2-20 caracteres)
- **Cantidad de preguntas**: Entre 5 y 20 preguntas
- **Dificultad**: Fácil, Medio, Difícil
- **Categorías**: Mixto o selección entre 10 categorías específicas

### 🕹️ Funcionalidades del Juego
- **Temporizador por pregunta**: 20 segundos con indicador visual
- **Sistema de puntuación**: +10 puntos por respuesta correcta
- **Feedback visual**: Respuestas correctas/incorrectas destacadas
- **Progreso en tiempo real**: Contador de preguntas y puntuación

### 📊 Pantalla de Resultados
- Puntuación total obtenida
- Número y porcentaje de aciertos
- Tiempo promedio por pregunta
- Opciones para:
  - Jugar otra vez con misma configuración
  - Cambiar configuración
  - Finalizar el juego

## 🚀 Cómo Usar

### Opción 1: Abrir directamente
1. Descarga todos los archivos del proyecto
2. Abre `index.html` en tu navegador web


## 🛠️ Tecnologías Utilizadas

- **HTML**: Estructura semántica
- **CSS**: 
  - Diseño 
  - Animaciones y transiciones
  - Gradientes y efectos visuales
- **JavaScript**:
  - Fetch API para peticiones asíncronas
  - Programación asíncrona con async/await
  - Manipulación del DOM
  - Temporizadores con setInterval


## 🔧 API Utilizada

El juego utiliza la [Open Trivia Database API](https://opentdb.com/) que ofrece:
- Miles de preguntas de trivia verificadas
- Múltiples categorías y dificultades
- Preguntas en español
- Formato JSON fácil de consumir

## ⚙️ Personalización

Puedes modificar fácilmente:
- **Colores**: Editando las variables CSS
- **Tiempo por pregunta**: Cambiando `timeLeft` en script.js
- **Puntuación**: Modificando el valor de puntos por acierto
- **Categorías**: Añadiendo más opciones al selector

## 🐛 Solución de Problemas

### Error al cargar preguntas
- Verifica tu conexión a internet
- La API podría estar temporalmente no disponible

### El temporizador no funciona correctamente
- Asegúrate de que JavaScript esté habilitado
- Prueba en un navegador actualizado

### Diseño no se ve bien
- Usa un navegador moderno (Chrome, Firefox, Safari, Edge)
- Verifica que todos los archivos CSS se carguen correctamente

## 📝 Notas de Desarrollo

- Código completamente comentado para fácil comprensión
- Variables con nombres descriptivos en español
- Manejo de errores implementado
- Optimizado para rendimiento

## 👥 Contribuciones

Las contribuciones son bienvenidas. Puedes:
- Reportar bugs
- Sugerir nuevas características
- Mejorar el diseño
- Optimizar el código
