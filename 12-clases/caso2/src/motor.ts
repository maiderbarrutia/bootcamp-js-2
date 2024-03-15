import { Reserva } from "./modelo";

export class CalculadoraReservas {
  protected preciosPorDia: { [tipoHabitacion: string]: number } = {
    standard: 100,
    suite: 150,
  };
  protected _subtotal: number = 0;
  protected _total: number = 0;

  constructor(protected reservas: Reserva[]) {
    this.calcularSubtotal();
    this.calcularTotal();
  }

  protected calcularSubtotal(): void {
    for (const reserva of this.reservas) {
      const precioPorNoche = this.preciosPorDia[reserva.tipoHabitacion];
      console.log("particular: " + precioPorNoche);
      const cargoAdicional = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0;
      this._subtotal += (precioPorNoche + cargoAdicional) * reserva.noches;
    }
  }

  protected calcularTotal(): void {
    this._total = this._subtotal * 1.21; // Al subtotal añadir IVA del 21%
  }

  get subtotal(): number {
    return this._subtotal;
  }

  get total(): number {
    return this._total;
  }
}

export class CalculadoraReservasTourOperador extends CalculadoraReservas {
  constructor(reservas: Reserva[]) {
    super(reservas);
  }

  protected calcularSubtotal(): void {
    for (const reserva of this.reservas) {
      const precioPorNoche = this.preciosPorDia[reserva.tipoHabitacion];
      console.log("tour: " + precioPorNoche);
      const cargoAdicional = reserva.pax > 1 ? (reserva.pax - 1) * 40 : 0;
      this._subtotal +=
        precioPorNoche * reserva.noches + cargoAdicional * reserva.noches;
    }

    const subtotal = this._subtotal;
    this.aplicarDescuento(subtotal);
    // Aplicar descuento del 15% para el tour operador
  }
  protected aplicarDescuento(_subtotal: number): void {
    this._subtotal -= (this._subtotal * 15) / 100;
  }

  protected calcularTotal(): void {
    super.calcularTotal(); // Primero se llama al método original para calcular el total con el IVA
    this._total *= 0.85; // Aplicar descuento del 15% para el tour operador
  }
}
