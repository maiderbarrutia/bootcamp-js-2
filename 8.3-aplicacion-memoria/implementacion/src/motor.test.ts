// import { vi } from "vitest";
// import * as motor from "./motor";
import { sePuedeVoltearLaCarta } from "./motor";
import { tablero } from "./modelo";

// describe("barajarCartas", () => {
//   it("cartas[0] es diferente de cartaBarajada[0]", () => {
//     //Arrange
//     const expected: number = cartas[1].idFoto;
//     // vi.spyOn(motor, "barajarCartas").mockReturnValue(cartas);
//     //Act
//     const result = barajarCartas(tablero.cartas);
//     //Asssert
//     expect(result).toBe(expected);
//   });
// });

describe("sePuedeVoltearLaCarta", () => {
  it("cartas[0] es diferente de cartaBarajada[0]", () => {
    //Arrange
    const expected: boolean = true;
    //Act
    const result = sePuedeVoltearLaCarta(tablero, 11);

    //Asssert
    expect(result).toBe(expected);
  });
});
