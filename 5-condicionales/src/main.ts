import "./style.css";

//VARIABLES GENERALES
const giveCardButton = document.getElementById("giveCardButton");
const restartGameButton = document.getElementById("restartButton");
const whatHappensButton = document.getElementById("whatHappensButton");
const standUpButton = document.getElementById("standUpButton");

let score: number = 0;

//MOSTRAR PUNTUACIÓN
function showScore(): void {
  const showScore = document.getElementById("showScore");
  if (showScore !== null && showScore !== undefined) {
    showScore.textContent = score.toString();
  }
}

//GENERAR NUMERO ALEATORIO
const generateRandomNumber = (): number => Math.ceil(Math.random() * 10);

//GENERAR NÚMERO DE CARTA
const generateCardNumber = (cardNumber: number): number =>
  cardNumber <= 7 ? cardNumber : cardNumber + 2;

//ASIGNAR URL CON LA IMAGEN DE CADA CARTA A CADA NÚMERO
const getCardUrl = (card: number): string => {
  let cardUrl: string = "";
  switch (card) {
    case 1:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;

    case 2:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;

    case 3:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;

    case 4:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;

    case 5:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;

    case 6:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;

    case 7:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;

    case 10:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;

    case 11:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;

    case 12:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;

    default:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
      break;
  }
  return cardUrl;
};

// PUNTOS DE CADA CARTA
const cardPoints = (cardNumber: number): void => {
  let points;
  cardNumber === 10 || cardNumber === 11 || cardNumber === 12
    ? (points = 0.5)
    : (points = cardNumber);
  totalPoints(points);
};

//PUNTUACIÓN TOTAL
function totalPoints(points: number) {
  score = score + points;
  showScore();
  winOrLose(score);
}

//PINTAR LA CARTA MEDIANTE URL SEGUN NUMERO DE CARTA
function assignCardUrl(card: number): void {
  const urlCarta = getCardUrl(card);
  const imgCard = document.getElementById("cardImg");

  if (
    imgCard !== undefined &&
    imgCard !== null &&
    imgCard instanceof HTMLImageElement
  ) {
    imgCard.src = urlCarta;
  }
}

// DAR CARTA
function giveCard(): void {
  const randomNumber = generateRandomNumber();
  const cardNumber = generateCardNumber(randomNumber);

  assignCardUrl(cardNumber);
  cardPoints(cardNumber);
}

// HAS GANADO O PERDIDO?
function winOrLose(totalScore: number) {
  if (totalScore > 7.5) {
    gameOver();
  }
  if (totalScore === 7.5) {
    win();
  }
}

//MENSAJES
function messages(messageText: string, color: string): void {
  const messagesContent = document.getElementById("messagesContent");
  if (
    messagesContent !== null &&
    messagesContent !== undefined &&
    messagesContent instanceof HTMLParagraphElement
  ) {
    messagesContent.textContent = messageText;
    messagesContent.style.backgroundColor = color;
  }
}

//HABILITAR BOTONES
const enableOrDisableButton = (id: string, enabled: boolean): void => {
  const button = document.getElementById(id);
  button !== null && button !== undefined && button instanceof HTMLButtonElement
    ? (button.disabled = enabled)
    : console.error(`No existe el <button> con id: ${id}`);
};

//INICIAR JUEGO
function restartGame() {
  score = 0;
  showScore();
  enableOrDisableButton("giveCardButton", false);
  enableOrDisableButton("standUpButton", false);
  enableOrDisableButton("restartButton", true);
  enableOrDisableButton("whatHappensButton", true);
  assignCardUrl(0);
  messages("", "");
}

// JUEGO TERMINADO
const gameOver = (): void => {
  messages("game over", "red");
  enableOrDisableButton("giveCardButton", true);
  enableOrDisableButton("standUpButton", true);
  enableOrDisableButton("restartButton", false);
  enableOrDisableButton("whatHappensButton", true);
  assignCardUrl(0);
};

//PLANTARSE
function stopGame() {
  enableOrDisableButton("giveCardButton", true);
  enableOrDisableButton("standUpButton", true);
  enableOrDisableButton("restartButton", false);
  enableOrDisableButton("whatHappensButton", false);
  stopGameMessages();
}

//HAS GANADO LA PARTIDA CON 7.5 PUNTOS
function win() {
  enableOrDisableButton("giveCardButton", true);
  enableOrDisableButton("standUpButton", true);
  enableOrDisableButton("restartButton", false);
  enableOrDisableButton("whatHappensButton", true);
  stopGameMessages();
}

// MENSAJES AL PLANTARSE
function stopGameMessages() {
  if (score <= 4) {
    messages("Has sido muy conservador", "green");
  } else if (score > 4 && score < 6) {
    messages("Te ha entrado el canguelo eh?", "green");
  } else if (score >= 6 && score <= 7) {
    messages("Casi casi...", "green");
  } else if (score === 7.5) {
    messages("¡Lo has clavado! ¡Enhorabuena!", "green");
  }
}

// SABER LO QUE HABRÍA PASADO
function guessWhatHappens() {
  enableOrDisableButton("giveCardButton", false);
  enableOrDisableButton("standUpButton", false);
  enableOrDisableButton("restartButton", true);
  enableOrDisableButton("whatHappensButton", true);

  messages("", "");
}

//BOTONES
function buttons(button: HTMLElement | null, handler: () => void) {
  if (
    button instanceof HTMLButtonElement &&
    button !== undefined &&
    button !== null
  ) {
    button.addEventListener("click", handler);
  }
}

//INICIAR JUEGO
function loadGame() {
  buttons(giveCardButton, giveCard);
  buttons(restartGameButton, restartGame);
  buttons(whatHappensButton, guessWhatHappens);
  buttons(standUpButton, stopGame);
}

/* -------------------- CARGAR PARTIDA -------------*/
document.addEventListener("DOMContentLoaded", () => {
  loadGame();
});
