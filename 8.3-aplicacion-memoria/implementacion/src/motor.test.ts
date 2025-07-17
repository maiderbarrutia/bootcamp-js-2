import { describe, it, expect, beforeEach} from "vitest";

import {
  barajarCartas,
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  iniciaPartida,
} from "./motor";

import { crearColeccionDeCartasInicial, infoCartas, Tablero } from "./modelo";

describe("Motor", () => {
  let tablero: Tablero;

  beforeEach(() => {
    const cartas = crearColeccionDeCartasInicial(infoCartas);
    tablero = {
      cartas,
      estadoPartida: "PartidaNoIniciada",
    };
  });

  it("barajarCartas mezcla el array pero mantiene la misma longitud", () => {
    const copiaOriginal = [...tablero.cartas];
    const barajadas = barajarCartas([...tablero.cartas]);

    expect(barajadas.length).toBe(copiaOriginal.length);
    expect(barajadas).not.toEqual(copiaOriginal);
  });

  it("sePuedeVoltearLaCarta retorna false si la carta ya está vuelta y estadoPartida es DosCartasLevantadas", () => {
    tablero.cartas[0].estaVuelta = true;
    tablero.estadoPartida = "DosCartasLevantadas";
    const puedeVoltear = sePuedeVoltearLaCarta(tablero, 1);
    expect(puedeVoltear).toBe(false);
  });

  it("voltearLaCarta cambia el estado de la carta y actualiza estadoPartida y indices", () => {
    tablero.estadoPartida = "CeroCartasLevantadas";
    voltearLaCarta(tablero, 1);
    expect(tablero.cartas[0].estaVuelta).toBe(true);
    expect(tablero.estadoPartida).toBe("UnaCartaLevantada");
    expect(tablero.indiceCartaVolteadaA).toBe(0);

    voltearLaCarta(tablero, 2);
    expect(tablero.cartas[1].estaVuelta).toBe(true);
    expect(tablero.estadoPartida).toBe("CeroCartasLevantadas");
  });

  it("sonPareja devuelve true si dos indices apuntan a cartas con mismo idFoto", () => {
    tablero.cartas[0].idFoto = 42;
    tablero.cartas[1].idFoto = 42;
    expect(sonPareja(tablero, 0, 1)).toBe(true);
  });

  it("sonPareja devuelve false si dos indices apuntan a cartas con idFoto diferente", () => {
    tablero.cartas[0].idFoto = 1;
    tablero.cartas[1].idFoto = 2;
    expect(sonPareja(tablero, 0, 1)).toBe(false);
  });

  it("iniciaPartida reinicia el estadoPartida y baraja las cartas", () => {
    tablero.estadoPartida = "PartidaNoIniciada";
    const cartasAntes = [...tablero.cartas];
    iniciaPartida(tablero);
    expect(tablero.estadoPartida).toBe("CeroCartasLevantadas");
    expect(tablero.cartas.length).toBe(cartasAntes.length);
    expect(tablero.cartas).not.toEqual(cartasAntes);
  });
});
