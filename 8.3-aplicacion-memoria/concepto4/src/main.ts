import "./style.css";

function changeImageSrc(i: number): void {
  const cardImg = document.querySelectorAll(".cardImg");
  const selectedImage = cardImg[i];
  if (
    selectedImage !== null &&
    selectedImage !== undefined &&
    selectedImage instanceof HTMLImageElement
  ) {
    selectedImage.src = `./src/img/${i + 1}.png`;
  }
}
function flipCards(card: HTMLDivElement) {
  card.classList.add("flipped");
}

function removeFlippedCardsWhenTwoAreVisible() {
  const flippedCards = document.querySelectorAll(".flipped");
  for (let i = 0; i < flippedCards.length; i++) {
    const selectedFlippedCard = flippedCards[i];

    if (
      flippedCards.length >= 2 &&
      selectedFlippedCard !== null &&
      selectedFlippedCard !== undefined &&
      selectedFlippedCard instanceof HTMLDivElement
    ) {
      selectedFlippedCard.classList.remove("flipped");
    }
  }
}

function loadShowImage(): void {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, i: number) => {
    if (card !== null && card !== undefined && card instanceof HTMLDivElement) {
      card.addEventListener("click", function () {
        changeImageSrc(i);
        flipCards(card);
        setTimeout(removeFlippedCardsWhenTwoAreVisible, 2500);
      });
    }
  });
}
document.addEventListener("DOMContentLoaded", loadShowImage);
