import { Reserva } from "./modelo";

export class CalculadoraReservas {
  protected preciosPorDia: { [tipoHabitacion: string]: number };

  protected _subtotal: number = 0;
  protected _total: number = 0;

  constructor(
    protected reservas: Reserva[],
    preciosPorDia: { [tipoHabitacion: string]: number }
  ) {
    this.preciosPorDia = preciosPorDia;
    this.calcularSubtotal();
    this.calcularTotal();
  }

  //Poner esto en caso de querer implementar todo en las hijas
  protected calcularSubtotal(): void {}

  protected calcularTotal(): void {
    this._total = this._subtotal + (this._subtotal * 21) / 100;
  }

  get subtotal(): number {
    return this._subtotal;
  }

  get total(): number {
    return this._total;
  }
}

export class CalculadoraReservasClienteParticular extends CalculadoraReservas {
  constructor(reservas: Reserva[]) {
    // Lista de precios para cliente particular
    const preciosPorDia: { [tipoHabitacion: string]: number } = {
      standard: 100,
      suite: 150,
    };
    super(reservas, preciosPorDia);
  }
  protected calcularSubtotal(): void {
    for (const reserva of this.reservas) {
      const precioPorNoche = this.preciosPorDia[reserva.tipoHabitacion];
      const cargoAdicional = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0;
      const cargoDesayuno = reserva.desayuno
        ? reserva.pax * reserva.noches * 15
        : 0;

      this._subtotal +=
        precioPorNoche * reserva.noches +
        cargoAdicional * reserva.noches +
        cargoDesayuno;
    }
  }
}

export class CalculadoraReservasTourOperador extends CalculadoraReservas {
  constructor(reservas: Reserva[]) {
    // Lista de precios para tour operador
    const preciosPorDia: { [tipoHabitacion: string]: number } = {
      standard: 100,
      suite: 100,
    };
    super(reservas, preciosPorDia);
  }
  protected calcularSubtotal(): void {
    for (const reserva of this.reservas) {
      const precioPorNoche = this.preciosPorDia[reserva.tipoHabitacion];
      const cargoAdicional = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0;
      const cargoDesayuno = reserva.desayuno
        ? reserva.pax * reserva.noches * 15
        : 0;

      this._subtotal +=
        precioPorNoche * reserva.noches +
        cargoAdicional * reserva.noches +
        cargoDesayuno;
    }
    const subtotal = this._subtotal;
    this.aplicarDescuento(subtotal);
  }

  // Aplicar descuento del 15% para el tour operador
  protected aplicarDescuento(_subtotal: number): void {
    this._subtotal -= (this._subtotal * 15) / 100;
  }
}
