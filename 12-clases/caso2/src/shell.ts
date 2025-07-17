import { reservas } from "./modelo";
import { CalculadoraReservas, CalculadoraReservasTourOperador } from "./motor";

document.addEventListener("DOMContentLoaded", function () {
  let idCounter = 1;
  for (const reserva of reservas) {
    const calculadoraParticular = new CalculadoraReservas([reserva]);
    const calculadoraTourOperador = new CalculadoraReservasTourOperador([reserva]);
    let reservaId = idCounter++;
    console.log(
      "------------------ RESERVA NÚMERO " + reservaId + " ------------------"
    );
    console.log(
      "Subtotal para reserva PARTICULAR de " +
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
      "Subtotal para reserva TOUR OPERADOR de " +
        [reserva.noches] +
        " noches en habitación " +
        [reserva.tipoHabitacion] +
        " para " +
        [reserva.pax] +
        " personas:" +
        calculadoraTourOperador.subtotal.toFixed(2),
      "€"
    );
    console.log(
      "Total para reserva PARTICULAR de " +
        [reserva.noches] +
        " noches en habitación " +
        [reserva.tipoHabitacion] +
        " para " +
        [reserva.pax] +
        " personas:" +
        calculadoraParticular.total.toFixed(2),
      "€"
    );
    console.log(
      "Total para reserva TOUR OPERADOR de " +
        [reserva.noches] +
        " noches en habitación " +
        [reserva.tipoHabitacion] +
        " para " +
        [reserva.pax] +
        " personas:" +
        calculadoraTourOperador.total.toFixed(2),
      "€"
    );
  }
});
