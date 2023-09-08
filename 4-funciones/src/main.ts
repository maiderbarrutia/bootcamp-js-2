import "./style.css";

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const resetButton = document.getElementById("reset");
const valueChangeButton = document.getElementById("valueChangeButton");
let shiftNumber = document.getElementById("shiftNumber");

//NEXT BUTTON
function nextShift(): void {
  if (shiftNumber !== null && shiftNumber !== undefined) {
    let num = parseInt(shiftNumber.innerHTML);
    let newNum = num + 1;
    shiftNumber.innerHTML = newNum.toString().padStart(2, "0");
  }
}

if (nextButton !== null && nextButton !== undefined) {
  nextButton.addEventListener("click", nextShift);
}

//PREVIOUS BUTTON
function previousShift(): void {
  if (shiftNumber !== null && shiftNumber !== undefined) {
    let num = parseInt(shiftNumber.innerHTML);
    let newNum = num - 1;
    if (shiftNumber.innerHTML !== "00") {
      shiftNumber.innerHTML = newNum.toString().padStart(2, "0");
    }
  }
}

if (previousButton !== null && previousButton !== undefined) {
  previousButton.addEventListener("click", previousShift);
}

//RESET BUTTON
function resetShift(): void {
  const count: number = 0;

  if (shiftNumber !== null && shiftNumber !== undefined) {
    shiftNumber.innerText = count.toString().padStart(2, "0");
  }
}

if (resetButton !== null && resetButton !== undefined) {
  resetButton.addEventListener("click", resetShift);
}

//SHIFT NUMBER CHANGE
function shiftChange(): void {
  const shiftInputValue = document.getElementById(
    "shiftInputValue"
  ) as HTMLInputElement;
  if (
    shiftInputValue !== null &&
    shiftInputValue !== undefined &&
    shiftNumber !== null &&
    shiftNumber !== undefined
  ) {
    let assignedNum = shiftInputValue.value;
    shiftNumber.innerText = assignedNum.toString().padStart(2, "0");
  }
}
if (valueChangeButton !== null && valueChangeButton !== undefined) {
  valueChangeButton.addEventListener("click", shiftChange);
}
