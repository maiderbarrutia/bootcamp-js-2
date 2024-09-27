export interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

interface InfoCarta {
  idFoto: number;
  imagen: string;
}

export const infoCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen: "./src/img/1.png",
  },

  {
    idFoto: 2,
    imagen: "./src/img/2.png",
  },

  {
    idFoto: 3,
    imagen: "./src/img/3.png",
  },

  {
    idFoto: 4,
    imagen: "./src/img/4.png",
  },

  {
    idFoto: 5,
    imagen: "./src/img/5.png",
  },

  {
    idFoto: 6,
    imagen: "./src/img/6.png",
  },
];

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

export const crearColeccionDeCartasInicial = (
  infoCartas: InfoCarta[]
): Carta[] => {
  const nuevoArray: Carta[] = infoCartas.map((infoCadaCarta: InfoCarta) =>
    crearCartaInicial(infoCadaCarta.idFoto, infoCadaCarta.imagen)
  );

  return [...nuevoArray, ...nuevoArray];
};

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

export type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
}

const crearTableroInicial = (): Tablero => ({
  cartas: cartas,
  estadoPartida: "PartidaNoIniciada",
});

export let tablero: Tablero = crearTableroInicial();
