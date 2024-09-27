interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

interface InfoCarta {
  idFoto: number;
  imagen: string;
}


const infoCartas: InfoCarta[] = [
  /* Aquí ponemos seis cartas siguiendo la interfaz de InfoCarta */
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

console.log("INIT infocartas:", infoCartas);

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  const nuevoArray: Carta[] = infoCartas.map((infoCadaCarta: InfoCarta) =>
    crearCartaInicial(infoCadaCarta.idFoto, infoCadaCarta.imagen)
  );

  return [...nuevoArray, ...nuevoArray];
};

let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);
console.log("INIT cartas", cartas);
/*
    Aquí definimos el tipo de estado de la partida, la idea es que cuando empiece la partida todas las cartas estén boca abajo y si se hacen click sobre ellas no se volteen.
    EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar partida el estado de la partida cambiaría a "CeroCartasLevantadas" y así sucesivamente.
  */

type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
}

const crearTableroInicial = (): Tablero => ({
  cartas: cartas,
  estadoPartida: "PartidaNoIniciada",
});

let tablero: Tablero = crearTableroInicial();
console.log("INIT tablero: ", tablero);

/*-----------MOTOR------------*/
//1- Barajar cartas
const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas;
};
console.log("1-Barajar cartas:", barajarCartas(cartas));

function estadoPartida(tablero: Tablero, estadoPartida: EstadoPartida): void {
  tablero.estadoPartida = estadoPartida;
}
/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
//2-Se puede voltear carta?
const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  const cartaElegida = tablero.cartas[indice];

  return (
    (!cartaElegida.encontrada && !cartaElegida.estaVuelta) ||
    tablero.estadoPartida !== "DosCartasLevantadas"
  );
};
//3- Voltear
export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.estadoPartida = "UnaCartaLevantada";
    tablero.indiceCartaVolteadaA = indice;
    darVuelta(tablero, tablero.indiceCartaVolteadaA, true);

    // tablero.cartas[tablero.indiceCartaVolteadaA].estaVuelta = true; // hacer que solo haga esto con la seleccionada
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.estadoPartida = "DosCartasLevantadas";
    tablero.indiceCartaVolteadaB = indice;
    darVuelta(tablero, tablero.indiceCartaVolteadaB, true);

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
    // console.log(tablero.cartas);
  }
};
const darVuelta = (tablero: Tablero, indice: number, choose: boolean): void => {
  tablero.cartas = tablero.cartas.map((carta, index) => {
    if (index === indice) {
      return { ...carta, estaVuelta: choose };
    }
    return carta;
  });
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
      // console.log("son pareja", cartaA, cartaB);
      parejaEncontrada(tablero, indiceCartaVolteadaA, indiceCartaVolteadaB);
      // tablero.estadoPartida = "CeroCartasLevantadas";
      // console.log(tablero.estadoPartida);
    } else {
      parejaNoEncontrada(tablero, indiceCartaVolteadaA, indiceCartaVolteadaB);
      tablero.estadoPartida = "CeroCartasLevantadas";
      // console.log("no son pareja", cartaA, cartaB);
      // console.log(tablero.estadoPartida);
    }
  }
};
const sonPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): boolean => {
  return tablero.cartas[indiceA] === tablero.cartas[indiceB];
};
const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  console.log("indiceA Y b", indiceA, indiceB);
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  // tablero.cartas[indiceA].estaVuelta = true;
  // tablero.cartas[indiceB].estaVuelta = true;
  darVuelta(tablero, indiceA, true);
  darVuelta(tablero, indiceB, true);

  // estadoPartida(tablero, "DosCartasLevantadas");
  console.log(
    "encontrada",
    tablero.cartas[indiceA],
    tablero.cartas[indiceB],
    tablero.cartas
  );
  if (esPartidaCompleta(tablero)) {
    console.log("juego terminado");
  }
};
const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  console.log("no encontrada", indiceA, indiceB);

  tablero.cartas[indiceA].encontrada = false;
  tablero.cartas[indiceB].encontrada = false;
  // tablero.cartas[indiceA].estaVuelta = false;
  // tablero.cartas[indiceB].estaVuelta = false;
  darVuelta(tablero, indiceA, false);
  darVuelta(tablero, indiceB, false);
  ocultarCartasNoParejas(tablero, indiceA, indiceB);

  // estadoPartida(tablero, "CeroCartasLevantadas");
  // setTimeout(() => {
  //   ocultarCartasNoParejas(tablero, indiceA, indiceB);
  // }, 1000);
  console.log(tablero.cartas);
  // comprobarSiEstanFijas(tablero, indiceA, indiceB);
};

const accionOnClick = (tablero: Tablero): void => {
  const cartas = document.querySelectorAll(".card");
  cartas.forEach((carta) => {
    if (carta instanceof HTMLDivElement) {
      carta.addEventListener("click", () => {
        const cartaId: number = parseInt(carta.id) - 1;
        //Miramos si la carta es volteable (ver motor).
        console.log(
          "Se puede voltear carta?",
          sePuedeVoltearLaCarta(tablero, cartaId)
        );
        console.log("INIT cartas", tablero);

        if (sePuedeVoltearLaCarta(tablero, cartaId)) {
          /*Si es volteable la voltearemos (cambiamos el src de la imagen), para la imagen sería recomendable crear data-indice-imagen, 
          va a coincidir con el índice del div para pintar la imagen correspondiente al índice del array de cartas.*/
          voltearLaCarta(tablero, cartaId);
          console.log("index", cartaId);
          addImageSrc(tablero, cartaId);
          flipCard(cartaId);
          //Pintamos la carta clickada
          // pintarCarta(tablero, cartaId);
        }
      });
    }
  });
};

const iniciaPartida = (tablero: Tablero): void => {
  estadoPartida(tablero, "CeroCartasLevantadas");
  barajarCartas(tablero.cartas);
  accionOnClick(tablero);

  crearColeccionDeCartasInicial(infoCartas);
  crearTableroInicial();
};
document.addEventListener("DOMContentLoaded", function () {
  iniciaPartida(tablero);
});

const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta: Carta) => carta.encontrada === true);
};

/*********UI ********** */

export const addImageSrc = (tablero: Tablero, indice: number): void => {
  const cartaElegida = tablero.cartas[indice];
  const imagenCartaElegida = document.querySelector(
    `img[data-indice-imagen = "${indice + 1}"]`
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
    `img[data-indice-imagen = "${indice + 1}"]`
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

// export const pintarCarta = (tablero: Tablero, indice: number) => {
//   if (
//     tablero.cartas[indice].estaVuelta === true ||
//     tablero.cartas[indice].encontrada === true
//   ) {
//     addImageSrc(tablero, indice);
//     flipCard(indice);
//   }
// };
