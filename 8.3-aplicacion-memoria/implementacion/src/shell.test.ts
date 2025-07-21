import "./main";
import { iniciaPartida } from "./motor";
import { reiniciarPartida } from "./ui";
import { tablero } from "./modelo";

import { vi } from "vitest";

vi.mock("./motor", () => ({
  iniciaPartida: vi.fn(),
}));

vi.mock("./ui", () => ({
  reiniciarPartida: vi.fn(),
}));

describe("Test para inicio y reinicio de partida", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    document.body.innerHTML = `<button id="restartButton">Reiniciar</button>`;
  });

  it("Debe llamar a iniciaPartida cuando el DOM esté cargado y haya cartas", () => {
    tablero.cartas = [
      { idFoto: 1, imagen: "", estaVuelta: false, encontrada: false },
    ];

    document.dispatchEvent(new Event("DOMContentLoaded"));

    expect(iniciaPartida).toHaveBeenCalledWith(tablero);
  });

  it("Debe llamar a reiniciarPartida al hacer click en el botón", () => {
    const boton = document.getElementById("restartButton");

    if (boton) {
      boton.addEventListener("click", () => reiniciarPartida(tablero));
    }

    boton?.click();
    
    expect(reiniciarPartida).toHaveBeenCalledWith(tablero);
  });
});
