import { Tablero} from "./modelo";
import {
  estadoPartida,
  barajarCartas,
  sePuedeVoltearLaCarta,
  voltearLaCarta
} from "./motor";

export const accionOnClick = (tablero: Tablero): void => {
  const cartas = document.querySelectorAll(".card");

  cartas.forEach((carta) => {
    if (carta instanceof HTMLDivElement) {
      carta.addEventListener("click", () => {
        const cartaId: number = parseInt(carta.id);
        if (sePuedeVoltearLaCarta(tablero, cartaId)) {
          voltearLaCarta(tablero, cartaId);
          pintarCarta(tablero, cartaId);
        }
      });
    }
  });
};

export const addImageSrc = (tablero: Tablero, indice: number): void => {
  const cartaElegida = tablero.cartas[indice - 1];
  const imagenCartaElegida = document.querySelector(
    `img[data-indice-imagen = "${indice}"]`
  );
  if (
    imagenCartaElegida !== null &&
    imagenCartaElegida !== undefined &&
    imagenCartaElegida instanceof HTMLImageElement
  ) {
    imagenCartaElegida.src = cartaElegida.imagen;
  }
};

export const removeImageSrc = (indice: number): void => {
  const imagenCartaElegida = document.querySelector(
    `img[data-indice-imagen = "${indice}"]`
  );

  if (imagenCartaElegida instanceof HTMLImageElement) {
    imagenCartaElegida.src = "";
  }
};

export const flipCard = (indice: number): void => {
  const imagenCartaElegida = document.querySelector(
    `img[data-indice-imagen = "${indice}"]`
  );
  imagenCartaElegida?.parentElement?.classList.add("flipped");
};

export const removeFlippedCard = (indice: number): void => {
  const imagenCartaElegida = document.querySelector(
    `img[data-indice-imagen = "${indice}"]`
  );
  imagenCartaElegida?.parentElement?.classList.remove("flipped");
};

const ocultarCartas = (index: number): void => {
    removeFlippedCard(index + 1);
    removeImageSrc(index + 1);
};

export const ocultarCartasNoParejas = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  
  ocultarCartas(indiceA)
  ocultarCartas(indiceB)
};

export const pintarCarta = (tablero: Tablero, indice: number) => {
  if (
    tablero.cartas[indice - 1].estaVuelta === true ||
    tablero.cartas[indice - 1].encontrada === true
  ) {
    addImageSrc(tablero, indice);
    flipCard(indice);
  }
};

export const reiniciarPartida = (tablero: Tablero): void => {
  const imagenes = document.querySelectorAll(".card img");
  for (let index = 0; index < imagenes.length; index++) {
    ocultarCartas(index)
  };
  estadoPartida(tablero, "CeroCartasLevantadas");
  tablero
  barajarCartas(tablero.cartas);

};