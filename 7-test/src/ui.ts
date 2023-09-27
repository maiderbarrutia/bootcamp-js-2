import { game } from "./modelo";
import {
  generateRandomNumber,
  generateCardNumber,
  assignCardPoints,
  calculateTotalPoints,
} from "./motor";

//MOSTRAR PUNTUACIÓN
function showScore(): void {
  const showScore = document.getElementById("showScore");
  if (
    showScore !== null &&
    showScore !== undefined &&
    showScore instanceof HTMLSpanElement
  ) {
    showScore.textContent = game.score.toString();
  }
}

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

//PINTAR LA CARTA MEDIANTE URL SEGUN NUMERO DE CARTA
function assignCardUrl(cardNumber: number): void {
  const urlCarta: string = getCardUrl(cardNumber);
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
export function giveCard(): void {
  const randomNumber: number = generateRandomNumber();
  const cardNumber: number = generateCardNumber(randomNumber);
  const cardPoints: number = assignCardPoints(cardNumber);
  const totalPoints: number = calculateTotalPoints(cardPoints);

  showScore();
  assignCardUrl(cardNumber);
  checkGame(totalPoints);
}

// HAS GANADO O PERDIDO?
function checkGame(totalScore: number): void {
  if (totalScore > 7.5) {
    gameOver();
  }
  if (totalScore === 7.5) {
    winGame();
  }
}
// HABRIAS GANADO O PERDIDO?
function checkGuessWhatHappens(totalScore: number): void {
  if (totalScore > 7.5) {
    gameOver();
  }
  if (totalScore <= 7.5) {
    winAtWhatHappens();
  }
}

//MOSTRAR MENSAJES
function showMessages(messageText: string, color: string): void {
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
const disabledButton = (id: string, enabled: boolean): void => {
  const button = document.getElementById(id);
  button !== null && button !== undefined && button instanceof HTMLButtonElement
    ? (button.disabled = enabled)
    : console.error(`No existe el botón con id: ${id}`);
};

//DESHABILITAR BOTONES INICIAR JUEGO
function restartGamedisabledOrEnabledButtons(): void {
  disabledButton("giveCardButton", false);
  disabledButton("standUpButton", false);
  disabledButton("restartButton", true);
  disabledButton("whatHappensButton", true);
}
//DESHABILITAR BOTONES JUEGO TERMINADO
function gameOverdisabledOrEnabledButtons(): void {
  disabledButton("giveCardButton", true);
  disabledButton("standUpButton", true);
  disabledButton("restartButton", false);
  disabledButton("whatHappensButton", true);
}

//DESHABILITAR BOTONES PLANTARSE
function stopGamedisabledOrEnabledButtons(): void {
  disabledButton("giveCardButton", true);
  disabledButton("standUpButton", true);
  disabledButton("restartButton", false);
  disabledButton("whatHappensButton", false);
}

//DESHABILITAR BOTONES UANDO GANAS LA PARTIDA
function winGamedisabledOrEnabledButtons(): void {
  disabledButton("giveCardButton", true);
  disabledButton("standUpButton", true);
  disabledButton("restartButton", false);
  disabledButton("whatHappensButton", true);
}
//
function guessWhatHappensdisabledOrEnabledButtons(): void {
  disabledButton("giveCardButton", true);
  disabledButton("standUpButton", true);
  disabledButton("restartButton", false);
  disabledButton("whatHappensButton", true);
}

//INICIAR JUEGO
export function restartGame(): void {
  game.score = 0;
  showScore();
  restartGamedisabledOrEnabledButtons();
  assignCardUrl(0);
  showMessages("", "");
}

// JUEGO TERMINADO
export const gameOver = (): void => {
  gameOverdisabledOrEnabledButtons();
  showMessages("game over", "red");
  assignCardUrl(0);
};

//PLANTARSE
export function stopGame(): void {
  stopGamedisabledOrEnabledButtons();
  stopGameMessages();
}

//HAS GANADO LA PARTIDA CON 7.5 PUNTOS
export function winGame(): void {
  winGamedisabledOrEnabledButtons();
  stopGameMessages();
}

//HAS GANADO O NO AL DAR AL BOTÓN WHATHAPPENS
function winAtWhatHappens() {
  guessWhatHappensdisabledOrEnabledButtons();
  guessWhatHappensMessages();
}

// MENSAJES AL PLANTARSE
function stopGameMessages(): void {
  if (game.score <= 4) {
    showMessages("Has sido muy conservador", "green");
  } else if (game.score > 4 && game.score < 6) {
    showMessages("Te ha entrado el canguelo eh?", "green");
  } else if (game.score >= 6 && game.score <= 7) {
    showMessages("Casi casi...", "green");
  } else if (game.score === 7.5) {
    showMessages("¡Lo has clavado! ¡Enhorabuena!", "green");
  }
}

// MENSAJES EN ¿QUE HABRÍA PASADO?
function guessWhatHappensMessages(): void {
  if (game.score < 7.5) {
    showMessages("No habrías ganado pero hubieras sumado puntos", "green");
  } else if (game.score === 7.5) {
    showMessages("Habrías ganado", "green");
  } else if (game.score > 7.5) {
    showMessages("Habrías perdido", "red");
  }
}

// SABER LO QUE HABRÍA PASADO
export function guessWhatHappens(): void {
  guessWhatHappensdisabledOrEnabledButtons();
  guessWhatHappensMessages();
  const randomNumber: number = generateRandomNumber();
  const cardNumber: number = generateCardNumber(randomNumber);
  const cardPoints: number = assignCardPoints(cardNumber);
  const totalPoints: number = calculateTotalPoints(cardPoints);

  showScore();
  assignCardUrl(cardNumber);
  checkGuessWhatHappens(totalPoints);
}
