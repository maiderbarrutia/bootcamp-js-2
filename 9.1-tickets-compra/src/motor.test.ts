import { calcularPrecioTotal, calculaPrecioSinIva } from "./motor";
import { LineaTicket } from "./modelo";

describe("calcularPrecioTotal", () => {
  it("Debería devolver 60 el precio total del producto Perfume siendo el precio 20 y la cantidad 3", () => {
    //Arrange
    const linea: LineaTicket = {
      producto: {
        nombre: "Perfume",
        precio: 20,
        tipoIva: "general",
      },
      cantidad: 3,
    };
    const precio = linea.producto.precio;
    const expected: number = 60;
    //Act
    const result: number = calcularPrecioTotal(linea, precio);
    //Assert
    expect(result).toBe(expected);
  });
});

describe("calculaPrecioSinIva", () => {
  it("Debería devolver 15.8 de precio sin Iva siendo el precio inicial de 20 y con un porcentaje de iva del 21%", () => {
    //Arrange
    const precioInicial = 20;
    const porcentajeIva = 21;
    const expected: number = 15.8;
    //Act
    const result: number = calculaPrecioSinIva(precioInicial, porcentajeIva);
    //Assert
    expect(result).toBe(expected);
  });
});
