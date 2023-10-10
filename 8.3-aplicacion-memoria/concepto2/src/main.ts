import "./style.css";

function changeImageSrc(): void {
  const cardImg = document.querySelector(".cardImg");
  if (
    cardImg !== null &&
    cardImg !== undefined &&
    cardImg instanceof HTMLImageElement
  ) {
    cardImg.src = "./src/img/1.png";
    cardImg.parentElement?.classList.add("flipped");
  }
}

function loadShowImage(): void {
  const card = document.querySelector(".card");
  if (card !== null && card !== undefined && card instanceof HTMLDivElement) {
    card.addEventListener("click", changeImageSrc);
  }
}
document.addEventListener("DOMContentLoaded", loadShowImage);
