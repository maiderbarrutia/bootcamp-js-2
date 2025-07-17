import { describe, it, expect, beforeEach } from "vitest";
import { validate } from "./ui";
import { showMessage, showErrorList } from "./ui";
import type { ValidacionClave } from "./modelo";

// Simula el DOM
beforeEach(() => {
  document.body.innerHTML = `
    <input id="username" value="" />
    <input id="password" value="" />
    <button id="validateButton">Validar</button>
    <div id="message"></div>
  `;
});

describe("UI - showMessage", () => {
  it("muestra mensaje de éxito con clase success", () => {
    showMessage("¡Correcto!", false);
    const div = document.getElementById("message")!;
    expect(div.textContent).toBe("¡Correcto!");
    expect(div.classList.contains("success")).toBe(true);
    expect(div.classList.contains("error")).toBe(false);
  });

  it("muestra mensaje de error con clase error", () => {
    showMessage("Hubo un error", true);
    const div = document.getElementById("message")!;
    expect(div.textContent).toBe("Hubo un error");
    expect(div.classList.contains("error")).toBe(true);
    expect(div.classList.contains("success")).toBe(false);
  });
});

describe("UI - showErrorList", () => {
  it("muestra lista de errores en el mensaje", () => {
    const errores: ValidacionClave[] = [
      { esValida: false, error: "Debe tener mayúsculas" },
      { esValida: false, error: "Debe tener números" },
    ];

    showErrorList(errores);

    const message = document.getElementById("message")!;
    expect(message.classList.contains("error")).toBe(true);

    const titulo = message.querySelector("p")!;
    expect(titulo.textContent).toMatch(/La clave no cumple/i);

    const items = message.querySelectorAll("li");
    expect(items.length).toBe(2);
    expect(items[0].textContent).toBe("Debe tener mayúsculas");
    expect(items[1].textContent).toBe("Debe tener números");
  });
});

describe("UI - validate", () => {
  it("muestra errores si la clave es inválida", () => {
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    username.value = "usuario";
    password.value = "123";

    validate();

    const message = document.getElementById("message")!;
    expect(message.querySelectorAll("li").length).toBeGreaterThan(0);
    expect(message.classList.contains("error")).toBe(true);
  });

  it("muestra mensaje de éxito si la clave es válida", () => {
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    username.value = "usuario";
    password.value = "Valid1@34";

    validate();

    const message = document.getElementById("message")!;
    expect(message.textContent).toBe("La clave es válida!");
    expect(message.classList.contains("success")).toBe(true);
  });
});
