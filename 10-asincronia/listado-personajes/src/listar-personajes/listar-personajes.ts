import { Personaje } from "./listar-personajes.model";
import { obtenerPersonajes } from "./listar-personajes.api";

// Crea el contenedor de imagen con altura fija y centrado
const crearElementoImagen = (
  rutaImagen: string,
  nombreImagen: string
): HTMLDivElement => {
  const contenedor = document.createElement("div");
  contenedor.classList.add("contenedor-imagen");
  const imagen = document.createElement("img");
  imagen.src = `http://localhost:3000/${rutaImagen}`;
  imagen.alt = nombreImagen;
  contenedor.appendChild(imagen);
  return contenedor;
};

const crearParrafoTitulo = (titulo?: string, texto?: string): HTMLElement => {
  const parrafo = document.createElement("p");
  if (titulo && texto) {
    parrafo.innerHTML = `<strong>${titulo}:</strong> ${texto}`;
  } else if (titulo) {
    const destacado = document.createElement("strong");
    destacado.textContent = titulo;
    return destacado;
  } else if (texto) {
    parrafo.textContent = texto;
  } else {
    parrafo.textContent = "";
  }
  return parrafo;
};

const crearListaHabilidades = (
  titulo: string,
  habilidades: string[]
): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.innerHTML = `<strong>${titulo}:</strong> ${habilidades.join(", ")}`;
  return parrafo;
};

const crearContenedorPersonajes = (personaje: Personaje): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.className = "contenedor";
  elementoPersonaje.append(
    crearElementoImagen(personaje.imagen, personaje.nombre),
    crearParrafoTitulo("Nombre", personaje.apodo),
    crearParrafoTitulo("Especialidad", personaje.especialidad),
    crearListaHabilidades("Habilidades", personaje.habilidades)
    // , crearParrafoTitulo("Amigo", personaje.amigo)
  );
  return elementoPersonaje;
};

const limpiarListado = (contenedorListado: HTMLDivElement): void => {
  contenedorListado.innerHTML = "";
};

const mostrarMensaje = (
  contenedorListado: HTMLDivElement,
  mensaje: string
): void => {
  const mensajeElemento = document.createElement("p");
  mensajeElemento.textContent = mensaje;
  contenedorListado.appendChild(mensajeElemento);
};

const filtrarPersonajes = (
  personajes: Personaje[],
  filtro: string
): Personaje[] =>
  personajes.filter((personaje) =>
    personaje.nombre.toLowerCase().includes(filtro.toLowerCase())
);

const pintarPersonajesEnHtml = (
  contenedorListado: HTMLDivElement,
  personajes: Personaje[]
): void => {
  limpiarListado(contenedorListado);
  if (personajes.length === 0) {
    mostrarMensaje(contenedorListado, "No se encontraron resultados.");
  } else {
    personajes.forEach((personaje) => {
      const contenedorPersonaje = crearContenedorPersonajes(personaje);
      contenedorListado.appendChild(contenedorPersonaje);
    });
  }
};

const pintarPersonajes = async (): Promise<void> => {
  const personajes = await obtenerPersonajes();
  const listado = document.querySelector("#listado-personajes") as HTMLDivElement;
  pintarPersonajesEnHtml(listado, personajes);
};

const pintarPersonajesFiltrados = async (): Promise<void> => {
  const contenedorListado = document.querySelector("#listado-personajes") as HTMLDivElement;
  const campoFiltrar = document.getElementById("search") as HTMLInputElement;
  const valorDado = campoFiltrar.value.trim();
  const personajes = await obtenerPersonajes();
  const personajesFiltrados = filtrarPersonajes(personajes, valorDado);
  pintarPersonajesEnHtml(contenedorListado, personajesFiltrados);
};

document.addEventListener("DOMContentLoaded", () => {
  pintarPersonajes();
  const formulario = document.querySelector("#formulario") as HTMLFormElement;
  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    await pintarPersonajesFiltrados();
  });
});

