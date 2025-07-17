import { describe, it, expect, beforeEach } from "vitest";
import {
  accionOnClick,
  addImageSrc,
  removeImageSrc,
  flipCard,
  removeFlippedCard,
  ocultarCartasNoParejas,
  pintarCarta,
  reiniciarPartida,
} from "./ui";
import type { Tablero, Carta } from "./modelo";

describe("UI - juego de cartas", () => {
  let tablero: Tablero;
  let cartas: Carta[];

  beforeEach(() => {
    cartas = [
      { idFoto: 1, imagen: "img1.png", estaVuelta: false, encontrada: false },
      { idFoto: 2, imagen: "img2.png", estaVuelta: false, encontrada: false },
    ];

    tablero = {
      cartas,
      estadoPartida: "CeroCartasLevantadas",
      indiceCartaVolteadaA: undefined,
      indiceCartaVolteadaB: undefined,
    };

    document.body.innerHTML = `
      <div class="card" id="1"><img data-indice-imagen="1" src="" /></div>
      <div class="card" id="2"><img data-indice-imagen="2" src="" /></div>
    `;
  });

  it("addImageSrc agrega src correcto a la imagen", () => {
    addImageSrc(tablero, 1);
    const img = document.querySelector('img[data-indice-imagen="1"]') as HTMLImageElement;
    expect(img.src).toContain("img1.png");
  });

  it("removeImageSrc quita el src de la imagen", () => {
    const img = document.querySelector('img[data-indice-imagen="1"]') as HTMLImageElement;
    img.src = "algo.png";
    removeImageSrc(1);
    expect(img.getAttribute("src")).toBe("");
  });

  it("flipCard agrega la clase flipped al padre", () => {
    flipCard(1);
    const div = document.querySelector('img[data-indice-imagen="1"]')?.parentElement;
    expect(div?.classList.contains("flipped")).toBe(true);
  });

  it("removeFlippedCard remueve la clase flipped del padre", () => {
    const div = document.querySelector('img[data-indice-imagen="1"]')?.parentElement;
    div?.classList.add("flipped");
    removeFlippedCard(1);
    expect(div?.classList.contains("flipped")).toBe(false);
  });

  it("ocultarCartasNoParejas pone estaVuelta en false y oculta visualmente", () => {
    tablero.cartas[0].estaVuelta = true;
    tablero.cartas[1].estaVuelta = true;
    flipCard(1);
    flipCard(2);
    addImageSrc(tablero, 1);
    addImageSrc(tablero, 2);

    ocultarCartasNoParejas(tablero, 0, 1);

    expect(tablero.cartas[0].estaVuelta).toBe(false);
    expect(tablero.cartas[1].estaVuelta).toBe(false);

    const div1 = document.querySelector('img[data-indice-imagen="1"]')?.parentElement;
    const div2 = document.querySelector('img[data-indice-imagen="2"]')?.parentElement;
    expect(div1?.classList.contains("flipped")).toBe(false);
    expect(div2?.classList.contains("flipped")).toBe(false);

    const img1 = document.querySelector('img[data-indice-imagen="1"]') as HTMLImageElement;
    const img2 = document.querySelector('img[data-indice-imagen="2"]') as HTMLImageElement;
    expect(img1.getAttribute("src")).toBe("");
    expect(img2.getAttribute("src")).toBe("");
  });

  it("pintarCarta muestra la carta y la voltea", () => {
    pintarCarta(tablero, 1);
    const div = document.querySelector('img[data-indice-imagen="1"]')?.parentElement;
    const img = document.querySelector('img[data-indice-imagen="1"]') as HTMLImageElement;

    expect(div?.classList.contains("flipped")).toBe(true);
    expect(img.src).toContain("img1.png");
  });

  it("reiniciarPartida oculta todas las cartas y resetea estado", () => {
    tablero.cartas[0].estaVuelta = true;
    tablero.cartas[0].encontrada = true;
    tablero.cartas[1].estaVuelta = true;
    tablero.cartas[1].encontrada = true;

    pintarCarta(tablero, 1);
    pintarCarta(tablero, 2);

    reiniciarPartida(tablero);

    expect(tablero.cartas.every(c => !c.estaVuelta && !c.encontrada)).toBe(true);
    expect(tablero.estadoPartida).toBe("CeroCartasLevantadas");

    const div1 = document.querySelector('img[data-indice-imagen="1"]')?.parentElement;
    const div2 = document.querySelector('img[data-indice-imagen="2"]')?.parentElement;
    expect(div1?.classList.contains("flipped")).toBe(false);
    expect(div2?.classList.contains("flipped")).toBe(false);

    const img1 = document.querySelector('img[data-indice-imagen="1"]') as HTMLImageElement;
    const img2 = document.querySelector('img[data-indice-imagen="2"]') as HTMLImageElement;
    expect(img1.getAttribute("src")).toBe("");
    expect(img2.getAttribute("src")).toBe("");
  });

  
  it("accionOnClick responde a click y voltea la carta si se puede voltear", () => {
    accionOnClick(tablero);

    const cardDiv = document.getElementById("1")!;
    cardDiv.click();

    expect(cardDiv.classList.contains("flipped")).toBe(true);

    const img = cardDiv.querySelector("img") as HTMLImageElement;
    expect(img.src).toContain("img1.png");
  });
});
