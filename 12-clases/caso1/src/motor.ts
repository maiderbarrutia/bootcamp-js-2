import { Reserva } from "./modelo";

export class CalculadoraReservas {
  private _reservas: Reserva[];
  private _IVA: number = 21;
  private _preciosPorNoche: { [tipoHabitacion: string]: number } = {
    standard: 100,
    suite: 150,
  };
  private _recargoPorPersonaExtra: number = 40;

  constructor(reservas: Reserva[]) {
    this._reservas = reservas;
  }

  public get subtotal(): number {
    let subtotal= 0;
    for (const reserva of this._reservas) {
      const precioPorNoche = this._preciosPorNoche[reserva.tipoHabitacion];
      const cargoAdicional = reserva.pax > 1 ? (reserva.pax - 1) * this._recargoPorPersonaExtra : 0;
      subtotal += (precioPorNoche + cargoAdicional) * reserva.noches;
    }
    return subtotal;
  }

  public get total(): number {
    return this.subtotal * (1 + this._IVA / 100);
  }
}

