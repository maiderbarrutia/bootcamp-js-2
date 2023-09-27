import { giveCard, restartGame, guessWhatHappens, stopGame } from "./ui";

//AGRUPAR BOTONES
function buttons(button: HTMLElement | null, handler: () => void): void {
  if (
    button instanceof HTMLButtonElement &&
    button !== undefined &&
    button !== null
  ) {
    button.addEventListener("click", handler);
  }
}

//INICIAR JUEGO
function loadGame(): void {
  //VARIABLES BOTONES
  const giveCardButton = document.getElementById("giveCardButton");
  const restartGameButton = document.getElementById("restartButton");
  const whatHappensButton = document.getElementById("whatHappensButton");
  const standUpButton = document.getElementById("standUpButton");

  buttons(giveCardButton, giveCard);
  buttons(restartGameButton, restartGame);
  buttons(whatHappensButton, guessWhatHappens);
  buttons(standUpButton, stopGame);
}

/* -------------------- CARGAR PARTIDA -------------*/
document.addEventListener("DOMContentLoaded", loadGame);
