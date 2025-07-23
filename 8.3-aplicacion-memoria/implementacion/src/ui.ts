import { Tablero} from "./modelo";
import {
  estadoPartida,
  barajarCartas,
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaEncontrada,
  esPartidaCompleta,
  parejaNoEncontrada
} from "./motor";

export const accionOnClick = (tablero: Tablero): void => {
  const cartas = document.querySelectorAll(".card");
  cartas.forEach((carta, index) => {

    if (carta instanceof HTMLDivElement) {
      carta.addEventListener("click", () => {
        manejadorDeEventoClick(tablero, index);
      });
    }
  });
};

const manejadorDeEventoClick = (tablero: Tablero, index: number) => {

  if (sePuedeVoltearLaCarta(tablero, index)) {
    voltearLaCarta(tablero, index);
    pintarCarta(tablero, index);
    verificarSiEsLaSegundaCarta(tablero);
  } else {
    console.log('A esta carta no se le puede dar la vuelta.');
  }
}

const verificarSiEsLaSegundaCarta = (tablero: Tablero) => {
  const indiceCartaA = tablero.indiceCartaVolteadaA;
  const indiceCartaB = tablero.indiceCartaVolteadaB;

  if (indiceCartaA !== undefined && indiceCartaB !== undefined) {
    if (sonPareja(tablero, indiceCartaA, indiceCartaB)) {
      parejaEncontrada(tablero, indiceCartaA, indiceCartaB);
      if (esPartidaCompleta(tablero)) {
        partidaTerminada();
      }
    } else {
      parejaNoEncontrada(tablero, indiceCartaA, indiceCartaB);
      setTimeout(() => {
        ocultarCartasNoParejas(tablero, indiceCartaA, indiceCartaB);
      }, 1000);
    }
  }
}

export const addImageSrc = (tablero: Tablero, indice: number): void => {
  const cartaElegida = tablero.cartas[indice];
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
    removeFlippedCard(index);
    removeImageSrc(index);
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
    addImageSrc(tablero, indice);
    flipCard(indice);
};

const mostrarMensajeFinal = () => {
  const cardsSection = document.querySelector(".cards");
  const overlay = document.createElement("div");
  
  overlay.id = "cardsOverlay";
  overlay.classList.add("overlay");
  overlay.textContent = "Has ganado la partida!";

  if (
    cardsSection !== null &&
    cardsSection !== undefined &&
    cardsSection instanceof HTMLElement
  ) {
    cardsSection.style.position = "relative";
    cardsSection.appendChild(overlay);
  }
  
}

const quitarMensajeFinal = () => {
  const overlay = document.getElementById("cardsOverlay");
  if (
    overlay !== null &&
    overlay !== undefined &&
    overlay instanceof HTMLElement
  ) {
    overlay.remove();
  }
}

const partidaTerminada =() =>{
  console.log('la partida está completada');
  mostrarMensajeFinal();
}

export const reiniciarPartida = (tablero: Tablero): void => {
  const imagenes = document.querySelectorAll(".card img");
  for (let i = 0; i < imagenes.length; i++) {
    ocultarCartas(i)
  };

  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });

  estadoPartida(tablero, "CeroCartasLevantadas");
  barajarCartas(tablero.cartas);
  quitarMensajeFinal();
};