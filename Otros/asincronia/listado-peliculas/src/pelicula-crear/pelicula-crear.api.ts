import axios from "axios";
import { Movie } from "./pelicula-crear.model";
export const crearPelicula = async (pelicula: Movie) => {
  const url = "http://localhost:3000/movies";
  const response = await axios.post(url, pelicula);
  return response.data;
};
