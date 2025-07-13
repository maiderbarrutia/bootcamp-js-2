import { validate } from "./ui";

//AGRUPAR BOTONES
function buttons(button: HTMLElement | null, handler: () => void): void {
  if (
    button instanceof HTMLButtonElement
  ) {
    button.addEventListener("click", handler);
  }
}

//HABILITAR BOTONES
const disableButton = (id: string, enabled: boolean): void => {
  const button = document.getElementById(id) as HTMLButtonElement | null;
  if (button) {
    button.disabled = enabled;
  } else {
    console.error(`No existe el botón con id: ${id}`);
  }
};

//HABILITAR EL BOTON CUANDO LOS CAMPOS USUARIO Y CLAVE NO ESTÉN VACIOS
function enableButton(): void {
  const userName = document.getElementById("username") as HTMLInputElement;
  const pass = document.getElementById("password") as HTMLInputElement;

  userName.addEventListener("input", checkInputs);
  pass.addEventListener("input", checkInputs);

  function checkInputs(): void {
    if (userName.value !== "" && pass.value !== "") {
      disableButton("validateButton", false);
    } else {
      disableButton("validateButton", true);
    }
  }
  checkInputs();
}

//QUE HAGA ACCIONES AL CLICKAR EL BOTTON
function loadActions(): void {
  const validateButton = document.getElementById("validateButton");
  enableButton();
  buttons(validateButton, validate);
}

document.addEventListener("DOMContentLoaded", loadActions);
