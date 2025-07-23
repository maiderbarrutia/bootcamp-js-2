import {
  Carta,
  Tablero,
  EstadoPartida,
  crearColeccionDeCartasInicial,
  infoCartas,
} from "./modelo";

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [{...cartas[i]}, {...cartas[j]}] = [cartas[j], cartas[i]];
  }
  return cartas;
};

export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  const cartaElegida = tablero.cartas[indice];

  return (
    tablero.estadoPartida !== "DosCartasLevantadas" &&
    !cartaElegida.encontrada &&
    !cartaElegida.estaVuelta
  );
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  tablero.cartas[indice].estaVuelta = true;

  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.estadoPartida = "UnaCartaLevantada";
    tablero.indiceCartaVolteadaA = indice;
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.estadoPartida = "DosCartasLevantadas";
    tablero.indiceCartaVolteadaB = indice;
  }
};

export const sonPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  estadoPartida(tablero, "CeroCartasLevantadas");
};

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {

  estadoPartida(tablero, "CeroCartasLevantadas");
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta: Carta) => carta.encontrada === true);
};

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.cartas = barajarCartas(crearColeccionDeCartasInicial(infoCartas));
  estadoPartida(tablero, "CeroCartasLevantadas");
};

export function estadoPartida(
  tablero: Tablero,
  estadoPartida: EstadoPartida
): void {
  tablero.estadoPartida = estadoPartida;
}
