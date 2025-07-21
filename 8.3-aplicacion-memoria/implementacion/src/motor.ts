import {
  Carta,
  Tablero,
  EstadoPartida,
  crearColeccionDeCartasInicial,
  infoCartas,
} from "./modelo";
import { accionOnClick, ocultarCartasNoParejas } from "./ui";

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas;
};

export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  const cartaElegida = tablero.cartas[indice - 1];

  return (
    tablero.estadoPartida !== "DosCartasLevantadas" &&
    !cartaElegida.encontrada &&
    !cartaElegida.estaVuelta
  );
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  tablero.cartas[indice - 1].estaVuelta = true;

  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.estadoPartida = "UnaCartaLevantada";
    tablero.indiceCartaVolteadaA = indice - 1;
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.estadoPartida = "DosCartasLevantadas";
    tablero.indiceCartaVolteadaB = indice - 1;

    const indiceA = tablero.indiceCartaVolteadaA;
    const indiceB = tablero.indiceCartaVolteadaB;
    
    if (
      indiceA !== null &&
      indiceA !== undefined &&
      indiceB !== null &&
      indiceB !== undefined
    ) {
      comprobacionPareja(tablero, indiceA, indiceB);
    }
  }
};

const comprobacionPareja = (
  tablero: Tablero,
  indiceCartaVolteadaA: number,
  indiceCartaVolteadaB: number
): void => {
  if (
    tablero.estadoPartida === "DosCartasLevantadas" &&
    tablero.indiceCartaVolteadaA !== null &&
    tablero.indiceCartaVolteadaB !== null &&
    tablero.indiceCartaVolteadaA !== undefined &&
    tablero.indiceCartaVolteadaB !== undefined
  ) {
    const cartaA = tablero.cartas[indiceCartaVolteadaA].idFoto;
    const cartaB = tablero.cartas[indiceCartaVolteadaB].idFoto;

    if (sonPareja(tablero, cartaA, cartaB)) {
      parejaEncontrada(tablero, cartaA, cartaB);
      tablero.estadoPartida = "CeroCartasLevantadas";
    } else {
      parejaNoEncontrada(tablero, indiceCartaVolteadaA, indiceCartaVolteadaB);
      tablero.estadoPartida = "CeroCartasLevantadas";
    }
  }
};

export const sonPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  estadoPartida(tablero, "DosCartasLevantadas");
  if (esPartidaCompleta(tablero)) {
    console.log("juego terminado");
  }
};

const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {

  estadoPartida(tablero, "CeroCartasLevantadas");
  setTimeout(() => {
    tablero.cartas[indiceA].estaVuelta = false;
    tablero.cartas[indiceB].estaVuelta = false;
    ocultarCartasNoParejas(tablero, indiceA, indiceB);
  }, 1000);
};

const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta: Carta) => carta.encontrada === true);
};

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.cartas = barajarCartas(crearColeccionDeCartasInicial(infoCartas));

  accionOnClick(tablero);
  estadoPartida(tablero, "CeroCartasLevantadas");


};

export function estadoPartida(
  tablero: Tablero,
  estadoPartida: EstadoPartida
): void {
  tablero.estadoPartida = estadoPartida;
}
