import axios from "axios";
import { Movie } from "./pelicula-editar.model";

//Obtener los datos de la película que queremos editar
export const obtenerPelicula = async (id: string): Promise<Movie> => {
  try {
    const { data } = await axios.get(`http://localhost:3000/movies/${id}`);
    return data;
  } catch (error) {
    throw new Error("Error al obtener la película");
  }
};

//Actualizar los datos de la película que queremos editar
export const actualizarPelicula = async (pelicula: Movie): Promise<void> => {
  try {
    await axios.put(`http://localhost:3000/movies/${pelicula.id}`, pelicula);
  } catch (error) {
    throw new Error("Error al actualizar la película");
  }
};
