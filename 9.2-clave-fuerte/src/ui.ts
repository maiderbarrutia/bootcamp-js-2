import { validarClave } from "./motor";
import { commonPasswords, ValidacionClave } from "./modelo";

export const showMessage = (message: string, isError: boolean): void => {
  const messageDiv = document.getElementById("message");
  if (messageDiv instanceof HTMLDivElement) {
    messageDiv.textContent = message;
    messageDiv.classList.remove("error", "success");
    messageDiv.classList.add(isError ? "error" : "success");
  } else {
    console.error("No se encontró el elemento con id 'message'");
  }
};

export const showErrorList = (resultadoValidacion: ValidacionClave[]): void => {
  const messageDiv = document.getElementById("message");

  if (!(messageDiv instanceof HTMLDivElement)) {
    console.error("No se encontró el elemento con id 'message'");
    return;
  }

  messageDiv.innerHTML = "";

  messageDiv.classList.remove("success");
  messageDiv.classList.add("error");

  const titulo = document.createElement("p");
  titulo.textContent = "La clave no cumple con los siguientes requisitos:";
  messageDiv.appendChild(titulo);

  const listaErrores = document.createElement("ul");

  resultadoValidacion.forEach((error) => {
    if (error.error) {
      const li = document.createElement("li");
      li.textContent = error.error;
      listaErrores.appendChild(li);
    }
  });

  messageDiv.appendChild(listaErrores);
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
    showErrorList(resultadoValidacion);
  } else {
    showMessage("La clave es válida!", false);
  }
};