// Banco de preguntas
const bancoPreguntas = [
  { texto: "¿Cuantos albumes tiene System of a down?", opciones: ["3", "6", "5", "2"], correcta: 2 },
  { texto: "¿Cuantos integrantes tiene System of a down?", opciones: ["6", "4", "2", "3"], correcta: 1 },
  { texto: "¿Quién es el vocalista principal?", opciones: ["Daron Malakian ", "Serj Tankian", "Shavo Odadjian ", "John Dolmayan"], correcta: 1 },
  { texto: "¿En que año sacaron su primer albúm?", opciones: ["2000", "1994", "1998", "2002"], correcta: 2 },
  { texto: "¿Cuál fue su canción mas controversial?", opciones: ["Spiders", "Soldier Side", "Shes Like Heroin", "Chop Suey!"], correcta: 3 },
  { texto: "¿De que origen son los integrantes de la banda?", opciones: ["Americano", "Armenio", "Argentino", "Aleman"], correcta: 1 },
  { texto: "¿Cuál fue su albúm mas popular?", opciones: ["Steal this album!", "Toxicity", "Hypnotize", "Mezmerize"], correcta: 1 },
  { texto: "¿Cuál era el nombre antiguo de la banda?", opciones: ["Soil", "The Apex Theory", "Snowblind", "Mt. Helium"], correcta: 0 },
  { texto: "¿Cuál albúm tiene más canciones?", opciones: ["Mezmerize", "System of a down", "Steal this album!", "Toxicity"], correcta: 2 },
  { texto: "¿En que año ganaron el Grammy a la mejor ejecución hard rock?", opciones: ["2004", "2006", "2003", "2005"], correcta: 1 },
  { texto: "¿En que país decidieron nunca hacer un concierto?", opciones: ["China", "Argentina", "Francia", "Turquía"], correcta: 3 },
  { texto: "Cuál genero de música NO describe a System of a down", opciones: ["Heavy metal", "Jazz", "Rock progresivo", "Metal alternativo"], correcta: 1 },
  { texto: "¿En que estado fue creada System of a down?", opciones: ["Texas", "Ohio", "Kansas", "California"], correcta: 3 },
  { texto: "¿En que año lanzaron 2 canciones nuevas?", opciones: ["2025", "2018", "2020", "2015"], correcta: 2 },
  { texto: "¿Cuál fue su primer premio?", opciones: ["Disco multiplatino", "Grammy", "Oscar", "Emmy"], correcta: 0 },
  { texto: "¿Que sencillo fue el más popular?", opciones: ["Sugar", "Soil", "Spiders", "Suite-Pee"], correcta: 0 }
];

// Selección aleatoria de 5 preguntas
function obtenerPreguntasAleatorias(banco, cantidad) {
  const copia = [...banco];
  const seleccionadas = [];
  while (seleccionadas.length < cantidad && copia.length > 0) {
    const indice = Math.floor(Math.random() * copia.length);
    seleccionadas.push(copia.splice(indice, 1)[0]);
  }
  return seleccionadas;
}

// 5 preguntas por partida
let preguntas = obtenerPreguntasAleatorias(bancoPreguntas, 5);

let preguntaActual = 0;
let puntos = 0;
let tiempoRestante = 15;
let timer;

// Elementos del DOM
const textoPregunta = document.getElementById("texto-pregunta");
const botonesOpciones = document.querySelectorAll(".opcion");
const puntosPreguntas = document.getElementById("puntos-preguntas");
const mensaje = document.getElementById("mensaje-preguntas");
const btnSiguiente = document.getElementById("btn-siguiente");
const btnReiniciar = document.getElementById("btn-reiniciar-preguntas");

// --- Estilos iniciales de botones ---
btnSiguiente.disabled = true;
btnSiguiente.style.backgroundColor = "gray";
btnReiniciar.style.opacity = "0.6";

// Mostrar una pregunta
function mostrarPregunta() {
  clearInterval(timer);
  tiempoRestante = 15;
  iniciarTemporizador();

  // Botón siguiente vuelve a desactivarse
  btnSiguiente.disabled = true;
  btnSiguiente.style.backgroundColor = "gray";

  const pregunta = preguntas[preguntaActual];
  textoPregunta.textContent = pregunta.texto;
  botonesOpciones.forEach((btn, index) => {
    btn.textContent = pregunta.opciones[index];
    btn.disabled = false;
    btn.classList.remove("correcta", "incorrecta");
    btn.onclick = () => seleccionarRespuesta(index);
  });
  mensaje.textContent = "Selecciona una respuesta...";
}

// Seleccionar respuesta
function seleccionarRespuesta(indice) {
  const pregunta = preguntas[preguntaActual];
  botonesOpciones.forEach(btn => btn.disabled = true);

  if (indice === pregunta.correcta) {
    puntos++;
    puntosPreguntas.textContent = puntos;
    botonesOpciones[indice].classList.add("correcta");
    mensaje.textContent = "¡Correcto!";
  } else {
    botonesOpciones[indice].classList.add("incorrecta");
    botonesOpciones[pregunta.correcta].classList.add("correcta");
    mensaje.textContent = "Respuesta incorrecta.";
  }

  clearInterval(timer);

  // Activa el botón siguiente con color amarillo
  btnSiguiente.disabled = false;
  btnSiguiente.style.backgroundColor = "gold";
}

// Siguiente pregunta
btnSiguiente.addEventListener("click", () => {
  preguntaActual++;
  if (preguntaActual < preguntas.length) {
    mostrarPregunta();
  } else {
    terminarJuego();
  }
});

// Reiniciar juego
btnReiniciar.addEventListener("click", () => {
  puntos = 0;
  preguntaActual = 0;
  puntosPreguntas.textContent = 0;
  botonesOpciones.forEach(btn => (btn.style.display = "inline-block"));
  btnReiniciar.style.backgroundColor = "";
  btnReiniciar.style.opacity = "0.6";
  btnSiguiente.style.display = "inline-block";
  mostrarPregunta();
});

// Temporizador
function iniciarTemporizador() {
  timer = setInterval(() => {
    tiempoRestante--;
    mensaje.textContent = `Tiempo restante: ${tiempoRestante}s`;
    if (tiempoRestante <= 0) {
      clearInterval(timer);
      terminarJuego();
    }
  }, 1000);
}

// Función para terminar el juego
function terminarJuego() {
  textoPregunta.textContent = "¡Juego terminado!";
  mensaje.textContent = `Puntaje final: ${puntos} / ${preguntas.length}`;
  botonesOpciones.forEach(btn => (btn.style.display = "none"));
  clearInterval(timer);

  // Muestra reiniciar con color amarillo
  btnReiniciar.style.opacity = "1";
  btnReiniciar.style.backgroundColor = "#ffd54f";

  // Oculta el botón de siguiente
  btnSiguiente.style.display = "none";
}

// Iniciar el juego
mostrarPregunta();
