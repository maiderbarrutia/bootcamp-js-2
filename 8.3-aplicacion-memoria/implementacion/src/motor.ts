import {
  Carta,
  Tablero,
  EstadoPartida,
  crearColeccionDeCartasInicial,
  crearTableroInicial,
  infoCartas,
} from "./modelo";
import { accionOnClick, ocultarCartasNoParejas } from "./ui";

/*1- En el motor nos va a hacer falta un método para barajar cartas*/
export const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas;
};

/* 2- Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas */
export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  const cartaElegida = tablero.cartas[indice - 1];

  return (
    !cartaElegida.encontrada ||
    (!cartaElegida.estaVuelta &&
      tablero.estadoPartida !== "DosCartasLevantadas")
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
      console.log("son pareja", cartaA, cartaB);
      parejaEncontrada(tablero, cartaA, cartaB);
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
  return tablero.cartas[indiceA] === tablero.cartas[indiceB];
};
// /* 4- Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa. */
const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  estadoPartida(tablero, "DosCartasLevantadas");
  console.log("encontrada");
  if (esPartidaCompleta(tablero)) {
    console.log("juego terminado");
  }
};
// /* 5- Aquí asumimos que no son pareja y las volvemos a poner boca abajo */
const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  // console.log("no encontrada", indiceA, indiceB);

  tablero.cartas[indiceA].encontrada = false;
  tablero.cartas[indiceB].encontrada = false;
  estadoPartida(tablero, "CeroCartasLevantadas");
  // setTimeout(() => {
  //   ocultarCartasNoParejas(tablero, indiceA, indiceB);
  // }, 1000);
  console.log(tablero.cartas);
  comprobarSiEstanFijas(tablero, indiceA, indiceB);
};
const comprobarSiEstanFijas = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  //Si no están encontradas hacemos
  if (
    !tablero.cartas[indiceA].encontrada &&
    !tablero.cartas[indiceB].encontrada
  ) {
    setTimeout(() => {
      ocultarCartasNoParejas(tablero, indiceA, indiceB);
      // tablero.cartas[indiceA].estaVuelta = false;
      // tablero.cartas[indiceB].estaVuelta = false;
    }, 1000);
  }
};
// /* 6- Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas) */
const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta: Carta) => carta.encontrada === true);
};

export const iniciaPartida = (tablero: Tablero): void => {
  estadoPartida(tablero, "CeroCartasLevantadas");
  barajarCartas(tablero.cartas);
  accionOnClick(tablero);

  crearColeccionDeCartasInicial(infoCartas);
  crearTableroInicial();
};

export function estadoPartida(
  tablero: Tablero,
  estadoPartida: EstadoPartida
): void {
  tablero.estadoPartida = estadoPartida;
}
