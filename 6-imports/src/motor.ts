import { game } from "./modelo";

//GENERAR NUMERO ALEATORIO
export const generateRandomNumber = (): number => Math.ceil(Math.random() * 10);

//GENERAR NÚMERO DE CARTA
export const generateCardNumber = (randomNumber: number): number =>
  randomNumber <= 7 ? randomNumber : randomNumber + 2;

//ASIGNAR URL CON LA IMAGEN DE CADA CARTA A CADA NÚMERO
export const getCardUrl = (card: number): string => {
  let cardUrl: string = "";
  switch (card) {
    case 1:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;

    case 2:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;

    case 3:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;

    case 4:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;

    case 5:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;

    case 6:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;

    case 7:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;

    case 10:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;

    case 11:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;

    case 12:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;

    default:
      cardUrl =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
      break;
  }
  return cardUrl;
};

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
