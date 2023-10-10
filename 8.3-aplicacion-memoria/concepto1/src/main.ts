import "./style.css";

const animalsArray: string[] = [
  "🦊",
  "🐶",
  "🐰",
  "🐴",
  "🦔",
  "🦜",
  "🦜",
  "🐶",
  "🦔",
  "🐴",
  "🦊",
  "🐰",
];

const shuffleArray = (animals: string[]): string[] => {
  for (let i = animals.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [animals[i], animals[j]] = [animals[j], animals[i]];
  }
  return animals;
};

console.log(shuffleArray(animalsArray));
