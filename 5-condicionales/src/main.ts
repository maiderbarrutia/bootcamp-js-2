import "./style.css";

//VARIABLES GENERALES
const giveCardButton = document.getElementById(
  "giveCardButton"
) as HTMLButtonElement;
const cardImg = document.getElementById("cardImg") as HTMLImageElement;
const messagesContent = document.getElementById(
  "messagesContent"
) as HTMLParagraphElement;
const restartGameButton = document.getElementById(
  "restartButton"
) as HTMLDivElement;
const standUpButton = document.getElementById(
  "standUpButton"
) as HTMLButtonElement;
const cardImgContainer = document.querySelector(
  ".cardAndMessage"
) as HTMLDivElement;
const whatHappensButton = document.getElementById(
  "whatHappensButton"
) as HTMLButtonElement;

let score: number = 0;

//MOSTRAR PUNTUACIÓN
function showScore(): void {
  const showScore = document.getElementById("showScore");
  if (showScore !== null && showScore !== undefined) {
    showScore.innerHTML = score.toString();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  showScore();
});

//PEDIR CARTA: Generar carta aleatoria
function giveCard(): void {
  const chosenCard = Math.ceil(Math.random() * 12);
  if (chosenCard <= 7 || chosenCard >= 10) {
    showCard(chosenCard);
    cardScore(chosenCard);
  }
}
if (giveCardButton !== null && giveCardButton !== undefined) {
  giveCardButton.addEventListener("click", giveCard);
}

// MOSTRAR CARTA
const showCard = (carta: number): void => {
  switch (carta) {
    case 1:
      cardImg.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;

    case 2:
      cardImg.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;

    case 3:
      cardImg.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;

    case 4:
      cardImg.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;

    case 5:
      cardImg.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;

    case 6:
      cardImg.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;

    case 7:
      cardImg.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;

    case 10:
      cardImg.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;

    case 11:
      cardImg.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;

    case 12:
      cardImg.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;

    default:
      break;
  }
};

//SUMAR PUNTUACIÓN Y MOSTRARLA
const cardScore = (chosenCard: number): void => {
  let points;
  if (chosenCard === 10 || chosenCard === 11 || chosenCard === 12) {
    points = 0.5;
  } else {
    points = chosenCard;
  }
  score = score + points;
  showScore();

  if (score > 7.5) {
    gameOver();
  }
};

//TERMINAR PARTIDA CUANDO SUPERAS 7.5 PUNTOS
const gameOver = (): void => {
  giveCardButton.style.display = "none";
  cardImgContainer.classList.add("blocked");
  messagesContent.innerHTML = "GameOver";
  messagesContent.style.backgroundColor = "red";
  // cardImg.style.display = "none";
  cardImg.src =
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  restartGameButton.style.display = "flex";
  standUpButton.style.display = "none";
};

//PLANTARSE
function stopGame() {
  giveCardButton.style.display = "none";
  standUpButton.style.display = "none";
  restartGameButton.style.display = "flex";
  messagesContent.style.backgroundColor = "green";
  whatHappensButton.style.display = "flex";
  cardImgContainer.classList.add("blocked");
  if (score <= 4) {
    messagesContent.innerHTML = "Has sido muy conservador";
  } else if (score > 4 && score < 6) {
    messagesContent.innerHTML = "Te ha entrado el canguelo eh?";
  } else if (score >= 6 && score <= 7) {
    messagesContent.innerHTML = "Casi casi...";
  } else if (score === 7.5) {
    messagesContent.innerHTML = "¡ Lo has clavado! ¡Enhorabuena!";
  }
}
if (standUpButton !== null && standUpButton !== undefined) {
  standUpButton.addEventListener("click", stopGame);
}

// REINICIAR JUEGO
function restartGame() {
  score = 0;
  showScore();
  cardImgContainer.classList.remove("blocked");
  messagesContent.style.backgroundColor = "";
  cardImg.style.display = "flex";
  whatHappensButton.style.display = "none";
  cardImg.src =
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  giveCardButton.style.display = "flex";
  messagesContent.innerHTML = "";
  restartGameButton.style.display = "none";
  standUpButton.style.display = "flex";
}
if (restartGameButton !== null && restartGameButton !== undefined) {
  restartGameButton.addEventListener("click", restartGame);
}

// SABER LO QUE HABRÍA PASADO
function guessWhatHappens() {
  cardImgContainer.classList.remove("blocked");
  messagesContent.style.backgroundColor = "";
  whatHappensButton.style.display = "none";
  messagesContent.innerHTML = "";
  giveCardButton.style.display = "flex";
}

if (whatHappensButton !== null && whatHappensButton !== undefined) {
  whatHappensButton.addEventListener("click", guessWhatHappens);
}
