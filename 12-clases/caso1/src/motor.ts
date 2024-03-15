import { Reserva } from "./modelo";

export class CalculadoraReservas {
  private preciosPorDia: { [tipoHabitacion: string]: number } = {
    standard: 100,
    suite: 150,
  };
  private _subtotal: number = 0; //Es privado porque es un valor intermedio que solo necesita ser accedido internamente para calcular el total
  public _total: number = 0;

  constructor(private reservas: Reserva[]) {
    this.calcularSubtotal();
    this.calcularTotal();
  }

  private calcularSubtotal(): void {
    //Modo 1:

    for (const reserva of this.reservas) {
      const precioPorNoche = this.preciosPorDia[reserva.tipoHabitacion];

      //Por cada persona adicional sumarle 40 € al precio de cada noche.
      const cargoAdicional = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0; //Si hay más de una persona, por cada 1 adicional (reserva.pax - 1) añadir 40. Si solo hay 1 persona cobrar 0€
      //   let cargoAdicional: number;
      //   if (reserva.pax > 1) {
      //     cargoAdicional = (reserva.pax - 1) * 40; //(reserva.pax - 1), al ser una persona gratis se resta 1
      //   } else {
      //     cargoAdicional = 0;
      //   }
      this._subtotal +=
        precioPorNoche * reserva.noches + cargoAdicional * reserva.noches;
    }

    //Modo 2:
    // for (let i = 0; i < this.reservas.length; i++) {
    //   const reserva = this.reservas[i];
    //   const precioPorNoche = this.preciosPorDia[reserva.tipoHabitacion];

    //   //   const cargoAdicional = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0;
    //   let cargoAdicional: number;
    //   if (reserva.pax > 1) {
    //     cargoAdicional = (reserva.pax - 1) * 40; //(reserva.pax - 1), al ser una persona gratis se resta 1
    //   } else {
    //     cargoAdicional = 0;
    //   }

    //   this._subtotal +=
    //     precioPorNoche * reserva.noches + cargoAdicional * reserva.noches;
    // }

    //Modo 3:
    // this._subtotal = this.reservas.reduce((acc, reserva) => {
    //   const precioPorNoche = this.preciosPorDia[reserva.tipoHabitacion];
    //   const cargoAdicional = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0;
    //   return (
    //     acc + precioPorNoche * reserva.noches + cargoAdicional * reserva.noches
    //   );
    // }, 0);
  }

  private calcularTotal(): void {
    this._total = this._subtotal + (this._subtotal * 21) / 100; // Al subtotal añadirIVA del 21%
  }

  get subtotal(): number {
    return this._subtotal;
  }

  get total(): number {
    // Agregar un getter para acceder al total de forma segura
    return this._total;
  }
}
