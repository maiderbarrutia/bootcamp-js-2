import "./style.css";

//VARIABLES
const giveCard = document.getElementById("giveCard") as HTMLButtonElement;
const restartGameButton = document.getElementById(
  "restartButton"
) as HTMLDivElement;
const cardImg = document.getElementById("cardImg") as HTMLImageElement;
const messages = document.getElementById("messages") as HTMLDivElement;
const standUpButton = document.getElementById(
  "standUpButton"
) as HTMLButtonElement;

let score: number = 0;

//MOSTRAR PUNTUACIÓN
function muestraPuntuacion(): void {
  const showScore = document.getElementById("showScore");
  if (showScore !== null && showScore !== undefined) {
    showScore.innerHTML = score.toString();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  muestraPuntuacion();
});

//PEDIR CARTA: Generar carta aleatoria

function dameCarta(): void {
  const chosenCard = Math.ceil(Math.random() * 12);

  if (chosenCard <= 7 || chosenCard >= 10) {
    if (score <= 7.5) {
      mostrarCarta(chosenCard);
      let points;
      if (chosenCard === 10 || chosenCard === 11 || chosenCard === 12) {
        points = 0.5;
      } else {
        points = chosenCard;
      }
      score = score + points;

      muestraPuntuacion();
    } else {
      console.log("game over");
      giveCard.style.display = "none";
      messages.innerHTML = "GameOver";
      cardImg.style.display = "none";
      restartGameButton.style.display = "flex";
      standUpButton.style.display = "none";
    }
  }
}

if (giveCard !== null && giveCard !== undefined) {
  giveCard.addEventListener("click", dameCarta);
}

// MOSTRAR CARTA
const mostrarCarta = (carta: number): void => {
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

//REINICIAR EL JUEGO
function restartGame() {
  cardImg.style.display = "flex";
  cardImg.src =
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  giveCard.style.display = "flex";
  messages.innerHTML = "";
  restartGameButton.style.display = "none";
  standUpButton.style.display = "flex";
  score = 0;
  muestraPuntuacion();
}
if (restartGameButton !== null && restartGameButton !== undefined) {
  restartGameButton.addEventListener("click", restartGame);
}

//PLANTARSE
function stopGame() {
  giveCard.style.display = "none";
  standUpButton.style.display = "none";
  restartGameButton.style.display = "flex";
  if (score <= 4) {
    messages.innerHTML = "Has sido muy conservador";
  } else if (score === 5) {
    messages.innerHTML = "Te ha entrado el canguelo eh?";
  } else if (score === 6 || (score = 7)) {
    messages.innerHTML = "Casi casi...";
  } else if (score === 7.5) {
    messages.innerHTML = "¡ Lo has clavado! ¡Enhorabuena!";
  }
}
if (standUpButton !== null && standUpButton !== undefined) {
  standUpButton.addEventListener("click", stopGame);
}
