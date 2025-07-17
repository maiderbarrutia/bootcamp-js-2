import { reservas } from "./modelo";
import { CalculadoraReservas } from "./motor";

document.addEventListener("DOMContentLoaded", function () {

  let idCounter = 1;
  for (const reserva of reservas) {
    const calculadoraParticular = new CalculadoraReservas([reserva]);
    let reservaId = idCounter++;
    console.log(
      "------------------ RESERVA NÚMERO " + reservaId + " ------------------"
    );
    console.log(
      "Subtotal para reserva de " +
        [reserva.noches] +
        " noches en habitación " +
        [reserva.tipoHabitacion] +
        " para " +
        [reserva.pax] +
        " personas:" +
        calculadoraParticular.subtotal.toFixed(2),
      "€"
    );
    console.log(
      "Total para reserva de " +
        [reserva.noches] +
        " noches en habitación " +
        [reserva.tipoHabitacion] +
        " para " +
        [reserva.pax] +
        " personas:" +
        calculadoraParticular.total.toFixed(2),
      "€"
    );
  }

  console.log(
      "------------------ SUMA RESERVAS ------------------"
    );
    const calculadoraParticular = new CalculadoraReservas(reservas);
    console.log(
      "Subtotal reservas cliente particular:",
      calculadoraParticular.subtotal.toFixed(2),
      "€"
    );
    console.log(
      "Total reservas cliente particular:",
      calculadoraParticular.total.toFixed(2),
      "€"
    );
});