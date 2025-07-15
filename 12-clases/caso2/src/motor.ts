import { Reserva } from "./modelo";

export class CalculadoraReservas {
  protected reservas: Reserva[];
  protected IVA: number = 21;
  protected preciosPorNoche: { [tipoHabitacion: string]: number } = {
    standard: 100,
    suite: 150,
  };
  protected recargoPorPersonaExtra: number = 40;

  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
  }

  public get subtotal(): number {
    let subtotal= 0;
    for (const reserva of this.reservas) {
      const precioPorNoche = this.preciosPorNoche[reserva.tipoHabitacion];
      const cargoAdicional = reserva.pax > 1 ? (reserva.pax - 1) * this.recargoPorPersonaExtra : 0;
      subtotal += (precioPorNoche + cargoAdicional) * reserva.noches;
    }
    return subtotal;
  }

  public get total(): number {
    return this.subtotal * (1 + this.IVA / 100);
  }
}

export class CalculadoraReservasTourOperador extends CalculadoraReservas {
  constructor(reservas: Reserva[]) {
    super(reservas);
    this.preciosPorNoche = {
      standard: 100,
      suite: 100,
    };
  }

  protected aplicarDescuento(subtotal: number): number {
    return subtotal - (subtotal * 15) / 100;
  }

  public get total(): number {
    const subtotalConDescuento = this.aplicarDescuento(this.subtotal);
    return subtotalConDescuento * (1 + this.IVA / 100);
  }
}