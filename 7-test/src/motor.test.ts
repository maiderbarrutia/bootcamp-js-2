import { vi } from "vitest";
import {
  generateRandomNumber,
  generateCardNumber,
  assignCardPoints,
  calculateTotalPoints,
} from "./motor";

describe("generateRandomNumber", () => {
  it("Debería de devolver 5 si el número aleatorio es 5 (0.5 según el random)", () => {
    //Arrange
    const expectedNumber: number = 5;
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    //Act
    const result: number = generateRandomNumber();
    //Assert
    expect(result).toBe(expectedNumber);
  });
  it("Debería de devolver 10 si el número aleatorio dado es 10 (1 según el random)", () => {
    //Arrange
    const expectedNumber: number = 10;
    vi.spyOn(Math, "random").mockReturnValue(1);
    //Act
    const result: number = generateRandomNumber();
    //Assert
    expect(result).toBe(expectedNumber);
  });
});
describe("generateCardNumber", () => {
  it("Debería de devolver 10 si el número aleatorio dado es 8", () => {
    //Arrange
    const num: number = 8;
    const expectedNumber: number = 10;
    //Act
    const result: number = generateCardNumber(num);
    //Assert
    expect(result).toBe(expectedNumber);
  });
  it("Debería de devolver 1 si el número aleatorio dado es 1", () => {
    //Arrange
    const num: number = 1;
    const expectedNumber: number = 1;
    //Act
    const result: number = generateCardNumber(num);
    //Assert
    expect(result).toBe(expectedNumber);
  });
});
describe("assignCardPoints", () => {
  it("Debería de devolver 2 si el número de carta es 2", () => {
    //Arrange
    const cardNumber: number = 2;
    const expectedNumber: number = 2;
    //Act
    const result: number = assignCardPoints(cardNumber);
    //Assert
    expect(result).toBe(expectedNumber);
  });
  it("Debería de devolver 0.5 si el número de carta es 10", () => {
    //Arrange
    const cardNumber: number = 10;
    const expectedNumber: number = 0.5;
    //Act
    const result: number = assignCardPoints(cardNumber);
    //Assert
    expect(result).toBe(expectedNumber);
  });
  it("Debería de devolver 5 si el número de carta es 5", () => {
    //Arrange
    const cardNumber: number = 5;
    const expectedNumber: number = 5;
    //Act
    const result: number = assignCardPoints(cardNumber);
    //Assert
    expect(result).toBe(expectedNumber);
  });
  it("Debería de devolver 0.5 si el número de carta es 12", () => {
    //Arrange
    const cardNumber: number = 12;
    const expectedNumber: number = 0.5;
    //Act
    const result: number = assignCardPoints(cardNumber);
    //Assert
    expect(result).toBe(expectedNumber);
  });
});
describe("calculateTotalPoints", () => {
  it("Debería de devolver 0.5 si los puntos acumulodos son 0.5", () => {
    //Arrange
    const points: number = 0.5;
    const expectedNumber: number = 0.5;
    //Act
    const result: number = calculateTotalPoints(points);
    //Assert
    expect(result).toBe(expectedNumber);
  });
  it("Debería de devolver 5.5 si los puntos acumulados son 0.5 + 5 puntos añadidos", () => {
    //Arrange
    const points: number = 5;
    const expectedNumber: number = 5.5;
    //Act
    const result: number = calculateTotalPoints(points);
    //Assert
    expect(result).toBe(expectedNumber);
  });
  it("Debería de devolver 7.5 si los puntos acumulados son 5.5 + 2 puntos añadidos", () => {
    //Arrange
    const points: number = 2;
    const expectedNumber: number = 7.5;
    //Act
    const result: number = calculateTotalPoints(points);
    //Assert
    expect(result).toBe(expectedNumber);
  });
  it("Debería de devolver 10.5 si los puntos acumulados son 7.5 + 3 puntos añadidos", () => {
    //Arrange
    const points: number = 3;
    const expectedNumber: number = 10.5;
    //Act
    const result: number = calculateTotalPoints(points);
    //Assert
    expect(result).toBe(expectedNumber);
  });
  it("Debería de devolver 11 si los puntos acumulados son 10.5 + 0.5 puntos añadidos", () => {
    //Arrange
    const points: number = 0.5;
    const expectedNumber: number = 11;
    //Act
    const result: number = calculateTotalPoints(points);
    //Assert
    expect(result).toBe(expectedNumber);
  });
});
