import { game } from "./modelo";

//GENERAR NUMERO ALEATORIO
export const generateRandomNumber = (): number => Math.ceil(Math.random() * 10);

//GENERAR NÚMERO DE CARTA
export const generateCardNumber = (randomNumber: number): number =>
  randomNumber <= 7 ? randomNumber : randomNumber + 2;

// CALCULAR PUNTOS DE CADA CARTA
export const assignCardPoints = (cardNumber: number): number => {
  let points: number;
  cardNumber >= 10 ? (points = 0.5) : (points = cardNumber);
  return points;
};

//PUNTUACIÓN TOTAL
export function calculateTotalPoints(points: number): number {
  game.score = game.score + points;
  return game.score;
}
