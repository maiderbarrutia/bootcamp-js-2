import { validarClave } from "./motor";
import { commonPasswords, ValidacionClave } from "./modelo";

const showMessage = (message: string, isError: boolean): void => {
  const messageDiv = document.getElementById("message");
  if (messageDiv instanceof HTMLDivElement) {
    messageDiv.textContent = message;
    messageDiv.style.color = isError ? "red" : "green";
  } else {
    console.error("No se encontró el elemento con id 'message' o no es un div");
  }
};

const showErrorList = (resultadoValidacion: ValidacionClave[]): void => {
  const errores = resultadoValidacion.map((error) =>
    error.error?.toLowerCase()
  );
  let errorMessage =
    "Incorrecto! La clave no cumple con los siguientes requisitos: ";
  if (errores.length > 1) {
    // errores.slice(0, -1) obtiene todos los errores menos el ultimo y con el join añade comas. Con " y " + errores.slice(-1); agrega "y" antes del último error
    errorMessage += errores.slice(0, -1).join(", ") + " y " + errores.slice(-1);
  } else {
    //Añade solo el primer error
    errorMessage += errores[0];
  }
  showMessage(errorMessage, true); //La lista de errores se muestra mediante el mensaje en html
};

export const validate = (): void => {
  const userName = document.getElementById("username") as HTMLInputElement;
  const pass = document.getElementById("password") as HTMLInputElement;
  const resultadoValidacion = validarClave(
    userName.value,
    pass.value,
    commonPasswords
  );
  if (resultadoValidacion.length > 0) {
    // Mostrar lista continua de errores
    showErrorList(resultadoValidacion);
  } else {
    showMessage("La clave es válida!", false);
  }
};
