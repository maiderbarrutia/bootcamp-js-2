import { productos } from "./modelo";
import { calculaTicket } from "./motor";

document.addEventListener("DOMContentLoaded", function () {
  calculaTicket(productos);
  console.log(calculaTicket(productos));
});
