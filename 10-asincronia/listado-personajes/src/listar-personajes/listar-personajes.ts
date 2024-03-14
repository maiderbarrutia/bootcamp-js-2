import { Personaje } from "./listar-personajes.model";
import { obtenerPersonajes } from "./listar-personajes.api";

const crearElementoImagen = (
  rutaImagen: string,
  nombreImagen: string
): HTMLImageElement => {
  const imagen = document.createElement("img");
  imagen.src = `http://localhost:3000/${rutaImagen}`;
  imagen.alt = nombreImagen;
  return imagen;
};

const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  return parrafo;
};

const crearContenedorPersonajes = (personaje: Personaje): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.classList.add("contenedor");
  const imagen = crearElementoImagen(personaje.imagen, personaje.nombre);
  elementoPersonaje.appendChild(imagen);
  const apodo = crearElementoParrafo(personaje.apodo);
  elementoPersonaje.appendChild(apodo);
  const especialidad = crearElementoParrafo(personaje.especialidad);
  elementoPersonaje.appendChild(especialidad);

  const habilidadesLista = document.createElement("ul");
  personaje.habilidades.forEach((habilidad) => {
    const habilidadElemento = document.createElement("li");
    habilidadElemento.textContent = habilidad;
    habilidadesLista.appendChild(habilidadElemento);
  });
  elementoPersonaje.appendChild(habilidadesLista);

  const amigo = crearElementoParrafo(personaje.amigo);
  elementoPersonaje.appendChild(amigo);

  return elementoPersonaje;
};

const pintarPersonajes = async (): Promise<void> => {
  const personajes = await obtenerPersonajes();
  const listado = document.querySelector("#listado-personajes");
  if (listado && listado instanceof HTMLDivElement) {
    personajes.forEach((personaje) => {
      const contenedorPersonaje = crearContenedorPersonajes(personaje);
      listado.appendChild(contenedorPersonaje);
      // console.log(personaje);
    });
  } else {
    throw new Error("No se ha encontrado el contenedor del listado");
  }
};

document.addEventListener("DOMContentLoaded", pintarPersonajes);

const limpiarListado = (contenedorListado: HTMLDivElement): void => {
  if (contenedorListado) {
    contenedorListado.innerHTML = "";
  } else {
    throw new Error("No se ha encontrado el contenedor del listado");
  }
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
): Personaje[] => {
  const personajesFiltrados: Personaje[] = personajes.filter((personaje) =>
    personaje.nombre.toLowerCase().includes(filtro.toLowerCase())
  );
  return personajesFiltrados;
};

const pintarPersonajesFiltradosEnHtml = (
  contenedorListado: HTMLDivElement,
  personaje: Personaje
): void => {
  const contenedorPersonaje = crearContenedorPersonajes(personaje);
  contenedorListado.appendChild(contenedorPersonaje);
};

const pintarPersonajesFiltrados = async (): Promise<Personaje[]> => {
  const contenedorListado = document.querySelector(
    "#listado-personajes"
  ) as HTMLDivElement;
  const campoFiltrar = document.getElementById("search") as HTMLInputElement;
  const valorDado = campoFiltrar.value;

  limpiarListado(contenedorListado);

  const personajes = await obtenerPersonajes();
  const personajesFiltrados = filtrarPersonajes(personajes, valorDado);

  if (personajesFiltrados.length === 0) {
    mostrarMensaje(contenedorListado, "No se encontraron resultados.");
  } else {
    personajesFiltrados.forEach((personaje) =>
      pintarPersonajesFiltradosEnHtml(contenedorListado, personaje)
    );
  }

  return personajesFiltrados;
};

// const botonFiltrar = document.getElementById(
//   "botonFiltrar"
// ) as HTMLButtonElement;
// botonFiltrar.addEventListener("click", async () => {
//   const personajesFiltrados = await pintarPersonajesFiltrados();
//   console.log(personajesFiltrados);
// });

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#formulario") as HTMLFormElement;
  const botonFiltrar = document.getElementById(
    "botonFiltrar"
  ) as HTMLButtonElement;

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar el envío del formulario

    // Aquí puedes llamar a la función para filtrar los personajes
    await pintarPersonajesFiltrados();
  });

  botonFiltrar.addEventListener("click", async () => {
    // Aquí también puedes llamar a la función para filtrar los personajes
    await pintarPersonajesFiltrados();
  });
});
