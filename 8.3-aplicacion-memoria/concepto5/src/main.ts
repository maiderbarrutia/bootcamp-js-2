import "./style.css";

interface CardInfo {
  id: number;
  alt: string;
  src: string;
}
const cardData: CardInfo[] = [
  {
    id: 1,
    alt: "León",
    src: "./src/img/1.png",
  },
  {
    id: 2,
    alt: "Buho",
    src: "./src/img/2.png",
  },
  {
    id: 3,
    alt: "Perro",
    src: "./src/img/3.png",
  },
  {
    id: 4,
    alt: "Gallina",
    src: "./src/img/4.png",
  },
  {
    id: 5,
    alt: "Cerdo",
    src: "./src/img/5.png",
  },
  {
    id: 6,
    alt: "Abeja",
    src: "./src/img/6.png",
  }
];

const duplicateCards: CardInfo[] = [...cardData, ...cardData];

function shuffleArray(animals: CardInfo[]): CardInfo[] {
  for (let i = animals.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [animals[i], animals[j]] = [animals[j], animals[i]];
  }
  return animals;
};

const shuffledCards: CardInfo[] = shuffleArray(duplicateCards);

function createCardsBoard(): void {
  const cardsContainer = document.getElementById("cards");

  if (cardsContainer !== null && cardsContainer !== undefined && cardsContainer instanceof HTMLElement) {
    shuffledCards.forEach((card, index) => {
  
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-indice-id", (index + 1).toString());

      const imgElement = document.createElement("img");
      imgElement.alt = `${card.alt}`;
      imgElement.setAttribute("id", (index + 1).toString());
  
      cardElement.appendChild(imgElement);
      cardsContainer.appendChild(cardElement);
    });
  }
}

function changeImageAttributes(
  selectedId: number,
  shuffledCards: CardInfo[]
): void {
  const cardImg = document.querySelectorAll(".card img");
  const selectedImg = cardImg[selectedId - 1];
  const selectedInfoCard = shuffledCards[selectedId - 1];
 
  if (
    selectedImg !== null &&
    selectedImg !== undefined &&
    selectedImg instanceof HTMLImageElement
  ) {
    selectedImg.src = selectedInfoCard.src;
    selectedImg.alt = selectedInfoCard.alt;
  }
}

function flipCard(card: HTMLDivElement) {
  card.classList.add("flipped");
}

function loadShowImage(): void {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (card !== null && card !== undefined && card instanceof HTMLDivElement) {
      card.addEventListener("click", function () {
        const selectedCardId = parseInt(card.getAttribute('data-indice-id')!);
        changeImageAttributes(selectedCardId, shuffledCards);
        flipCard(card);
      });
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  createCardsBoard();
  loadShowImage(); 
});
