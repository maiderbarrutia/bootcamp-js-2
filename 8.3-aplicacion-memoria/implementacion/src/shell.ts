import { tablero } from "./modelo";
import { iniciaPartida } from "./motor";
import { reiniciarPartida} from "./ui";

document.addEventListener("DOMContentLoaded", function () {
  if (tablero && tablero.cartas && tablero.cartas.length !== 0) {
    iniciaPartida(tablero);
  }
});

const iniciaPartidaBtn = document.getElementById("restartButton");
if (
  iniciaPartidaBtn !== null &&
  iniciaPartidaBtn !== undefined &&
  iniciaPartidaBtn instanceof HTMLButtonElement
) {
  iniciaPartidaBtn.addEventListener("click", () => reiniciarPartida(tablero));
}
