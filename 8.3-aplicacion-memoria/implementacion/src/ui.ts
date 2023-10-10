import { Tablero, crearTableroInicial } from "./modelo";
import {
  estadoPartida,
  barajarCartas,
  sePuedeVoltearLaCarta,
  voltearLaCarta,
} from "./motor";

//UI.ts
//1- Crear el tablero inicial y barajar cartas

export const reiniciarPartida = (tablero: Tablero): void => {
  const imagenes = document.querySelectorAll(".card img");
  imagenes.forEach((imagen) => {
    ocultarCartas(imagen);
  });
  estadoPartida(tablero, "CeroCartasLevantadas");
  crearTableroInicial();
  barajarCartas(tablero.cartas);
};

//2- Escuchando al evento click de cada carta (cuando el usuario pinche en una leeremos de data-indice-array, la posición del array de la carta)
export const accionOnClick = (tablero: Tablero): void => {
  const cartas = document.querySelectorAll(".card");

  cartas.forEach((carta) => {
    if (carta instanceof HTMLDivElement) {
      carta.addEventListener("click", () => {
        const cartaId: number = parseInt(carta.id);
        //Miramos si la carta es volteable (ver motor).
        if (sePuedeVoltearLaCarta(tablero, cartaId)) {
          /*Si es volteable la voltearemos (cambiamos el src de la imagen), para la imagen sería recomendable crear data-indice-imagen, 
          va a coincidir con el índice del div para pintar la imagen correspondiente al índice del array de cartas.*/
          voltearLaCarta(tablero, cartaId);
          //Pintamos la carta clickada
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

export const ocultarCartas = (imagen: Element): void => {
  if (
    imagen !== null &&
    imagen !== undefined &&
    imagen instanceof HTMLImageElement
  ) {
    imagen.src = "";
    const imagenId = parseInt(imagen.id);
    removeFlippedCard(imagenId);
    removeImageSrc(imagenId);
  }
};

export const ocultarCartasNoParejas = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  console.log("ocultar parejas", tablero, indiceA, indiceB);
  removeFlippedCard(indiceA + 1);
  removeImageSrc(indiceA + 1);
  removeFlippedCard(indiceB + 1);
  removeImageSrc(indiceB + 1);
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
