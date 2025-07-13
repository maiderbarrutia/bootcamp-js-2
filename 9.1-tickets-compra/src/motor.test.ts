import {
  calcularPrecioTotal,
  calculaPrecioSinIva,
  calcularTicketLinea,
  calcularTotalTicket,
  calculaTicket,
} from "./motor";

import { describe, it, expect } from "vitest";

const productos = [
  {
    producto: {
      nombre: "Legumbres",
      precio: 2,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    },
    cantidad: 3,
  },
];

describe("Funciones de cálculo del ticket", () => {
  it("calcularPrecioTotal: multiplica cantidad y precio correctamente", () => {
    const linea = { cantidad: 3 };
    expect(calcularPrecioTotal(linea as any, 2)).toBeCloseTo(6);
  });

  it("calculaPrecioSinIva: calcula correctamente el precio sin IVA", () => {
    const precioConIva = 121;
    const iva = 21;
    expect(calculaPrecioSinIva(precioConIva, iva)).toBeCloseTo(100);
  });

  it("calcularTicketLinea: genera correctamente cada línea con precio con y sin IVA", () => {
    const resultado = calcularTicketLinea(productos as any);
    expect(resultado.length).toBe(2);

    expect(resultado[0].nombre).toBe("Legumbres");
    expect(resultado[1].nombre).toBe("Perfume");

    expect(resultado[0].precioConIva).toBeCloseTo(4);
    expect(resultado[1].precioConIva).toBeCloseTo(60);

    expect(resultado[0].precioSinIva).toBeLessThan(resultado[0].precioConIva);
  });

  it("calcularTotalTicket: calcula totales con IVA, sin IVA y el IVA total correctamente", () => {
    const total = calcularTotalTicket(productos as any);
    expect(total.totalConIva).toBeCloseTo(64);
    expect(total.totalSinIva).toBeLessThan(total.totalConIva);
    expect(total.totalIva).toBeCloseTo(total.totalConIva - total.totalSinIva);
  });

  it("calculaTicket: devuelve un ticket completo con líneas, totales y desglose de IVA", () => {
    const ticket = calculaTicket(productos as any);
    expect(ticket.lineas.length).toBe(2);
    expect(typeof ticket.total.totalConIva).toBe("number");
    expect(Array.isArray(ticket.desgloseIva)).toBe(true);
  });
});
