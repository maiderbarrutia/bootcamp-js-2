import {
  LineaTicket,
  porcentajeIvaSegunTipo,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TotalPorTipoIva,
  TipoIva,
  TicketFinal,
} from "./modelo";

//Calcular precio total de cada producto multiplicando por la cantidad
export const calcularPrecioTotal = (
  linea: LineaTicket,
  precio: number
): number => {
  const precioProducto = parseFloat(precio.toFixed(2));
  return precioProducto * linea.cantidad;
};
const calculaPrecioSinIva = (
  precioInicial: number,
  porcentajeIva: number
): number => {
  const precio = parseFloat(precioInicial.toFixed(2));
  const iva: number = (precio * porcentajeIva) / 100;
  const precioSinIva: number = parseFloat((precio - iva).toFixed(2));

  return precioSinIva;
};

//Por cada producto queremos el nombre, la cantidad, el precio sin IVA, el tipo de IVA y el precio con IVA.
const calcularTicketLinea = (
  lineasTicket: LineaTicket[]
): ResultadoLineaTicket[] => {
  const listaLineas: ResultadoLineaTicket[] = [];

  for (let i = 0; i < lineasTicket.length; i++) {
    const linea = lineasTicket[i];
    const producto = linea.producto;

    const precioTotalConIva = calcularPrecioTotal(linea, producto.precio);
    const precioTotalSinIva = calcularPrecioTotal(
      linea,
      calculaPrecioSinIva(
        producto.precio,
        porcentajeIvaSegunTipo(producto.tipoIva)
      )
    );

    const resultadoLinea: ResultadoLineaTicket = {
      nombre: producto.nombre,
      cantidad: linea.cantidad,
      precioSinIva: parseFloat(precioTotalSinIva.toFixed(2)),
      tipoIva: producto.tipoIva,
      precioConIva: parseFloat(precioTotalConIva.toFixed(2)),
    };

    listaLineas.push(resultadoLinea);
  }

  return listaLineas;
};

const calcularTotalTicket = (
  lineasTicket: LineaTicket[]
): ResultadoTotalTicket => {
  const resultadosLinea = calcularTicketLinea(lineasTicket);

  const precios = resultadosLinea.reduce(
    (acc, resultadoLinea) => {
      const resultadoConIva = parseFloat(
        resultadoLinea.precioConIva.toFixed(2)
      );
      const resultadoSinIva = parseFloat(
        resultadoLinea.precioSinIva.toFixed(2)
      );
      const resultadoTotalIva = parseFloat(
        (resultadoConIva - resultadoSinIva).toFixed(2)
      );
      acc.totalSinIva += resultadoSinIva;
      acc.totalConIva += resultadoConIva;
      acc.totalIva += resultadoTotalIva;
      return acc;
    },
    { totalSinIva: 0, totalConIva: 0, totalIva: 0 }
  );
  return precios;
};

const calcularTotalPorTipoIva = (
  lineasTicket: LineaTicket[]
): TotalPorTipoIva[] => {
  const tiposIva = {
    general: 0,
    reducido: 0,
    superreducidoA: 0,
    superreducidoB: 0,
    superreducidoC: 0,
    sinIva: 0,
  };

  lineasTicket.forEach((linea) => {
    const porcentajeIva = porcentajeIvaSegunTipo(linea.producto.tipoIva);
    const precioSoloIva =
      (calcularPrecioTotal(linea, linea.producto.precio) * porcentajeIva) / 100;

    tiposIva[linea.producto.tipoIva] += precioSoloIva;
  });
  const tipos = Object.entries(tiposIva).map(([tipoIva, cuantia]) => ({
    tipoIva: tipoIva as TipoIva,
    cuantia,
  }));
  return tipos;
};

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const resultadosLinea = calcularTicketLinea(lineasTicket);
  const totalTicket = calcularTotalTicket(lineasTicket);
  const totalPorTipoIva = calcularTotalPorTipoIva(lineasTicket);

  const ticketFinal = {
    lineas: resultadosLinea,
    total: totalTicket,
    desgloseIva: totalPorTipoIva,
  };

  return ticketFinal;
};
