import "./style.css";

interface InfoCard {
  id: number;
  alt: string;
  src: string;
}
const infoCards: InfoCard[] = [
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
  },
  {
    id: 7,
    alt: "León",
    src: "./src/img/1.png",
  },
  {
    id: 8,
    alt: "Buho",
    src: "./src/img/2.png",
  },
  {
    id: 9,
    alt: "Perro",
    src: "./src/img/3.png",
  },
  {
    id: 10,
    alt: "Gallina",
    src: "./src/img/4.png",
  },
  {
    id: 11,
    alt: "Cerdo",
    src: "./src/img/5.png",
  },
  {
    id: 12,
    alt: "Abeja",
    src: "./src/img/6.png",
  },
];
// console.log(infoCards);
function changeImageAttributes(
  selectedId: number,
  infoCards: InfoCard[]
): void {
  const cardImg = document.querySelectorAll(".card img");
  const selectedImg = cardImg[selectedId - 1];
  const selectedInfoCard = infoCards[selectedId - 1];
  if (
    selectedImg !== null &&
    selectedImg !== undefined &&
    selectedImg instanceof HTMLImageElement
  ) {
    selectedImg.src = selectedInfoCard.src;
    selectedImg.alt = selectedInfoCard.alt;
  }
}
function flipCards(card: HTMLDivElement) {
  card.classList.add("flipped");
}

function loadShowImage(): void {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (card !== null && card !== undefined && card instanceof HTMLDivElement) {
      card.addEventListener("click", function () {
        const selectedCardId = parseInt(card.id);
        changeImageAttributes(selectedCardId, infoCards);
        flipCards(card);
      });
    }
  });
}
document.addEventListener("DOMContentLoaded", loadShowImage);
