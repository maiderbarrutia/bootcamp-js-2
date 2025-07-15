import { Reserva } from "./modelo";

export class CalculadoraReservas {
  protected reservas: Reserva[];
  protected IVA: number = 21;
  protected preciosPorNoche: { [tipoHabitacion: string]: number };
  protected recargoPorPersonaExtra: number = 40;
  protected cargoDesayunoPorPersonaPorNoche: number = 15;

  constructor(reservas: Reserva[], preciosPorNoche: { [tipoHabitacion: string]: number }) {
    this.reservas = reservas;
    this.preciosPorNoche = preciosPorNoche;
  }

  public get subtotal(): number {
    let subtotal= 0;
    for (const reserva of this.reservas) {
      const precioPorNoche = this.preciosPorNoche[reserva.tipoHabitacion];
      const cargoAdicional = reserva.pax > 1 ? (reserva.pax - 1) * this.recargoPorPersonaExtra : 0;
      const cargoDesayuno = reserva.desayuno ? reserva.pax * this.cargoDesayunoPorPersonaPorNoche : 0;
      subtotal += (precioPorNoche + cargoAdicional + cargoDesayuno) * reserva.noches;
    }
    return subtotal;
  }

  public get total(): number {
    return this.subtotal * (1 + this.IVA / 100);
  }
}

export class CalculadoraReservasClienteParticular extends CalculadoraReservas {
  constructor(reservas: Reserva[]) {
    super(reservas, {
      standard: 100,
      suite: 150,
    });
  }
}

export class CalculadoraReservasTourOperador extends CalculadoraReservas {
  constructor(reservas: Reserva[]) {
    super(reservas, {
      standard: 100,
      suite: 100,
    });
  }

  protected aplicarDescuento(subtotal: number): number {
    return subtotal - (subtotal * 15) / 100;
  }

  public override get total(): number {
    const subtotalConDescuento = this.aplicarDescuento(this.subtotal);
    return subtotalConDescuento * (1 + this.IVA / 100);
  }
}

