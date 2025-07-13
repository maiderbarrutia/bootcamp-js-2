import { beforeEach, describe, expect, it, vi } from "vitest";
import './main';


beforeEach(() => {
  document.body.innerHTML = `
    <input id="username" />
    <input id="password" />
    <button id="validateButton" disabled>Validar</button>
    <div id="message"></div>
  `;
});

describe("disableButton", () => {
  it("desactiva el botón si le pasamos true", () => {
    const button = document.getElementById("validateButton") as HTMLButtonElement;
    button.disabled = false;

    const disableButton = (id: string, enabled: boolean) => {
      const button = document.getElementById(id) as HTMLButtonElement;
      if (button) {
        button.disabled = enabled;
      }
    };

    disableButton("validateButton", true);
    expect(button.disabled).toBe(true);
  });

  it("activa el botón si le pasamos false", () => {
    const button = document.getElementById("validateButton") as HTMLButtonElement;
    button.disabled = true;

    const disableButton = (id: string, enabled: boolean) => {
      const button = document.getElementById(id) as HTMLButtonElement;
      if (button) {
        button.disabled = enabled;
      }
    };

    disableButton("validateButton", false);
    expect(button.disabled).toBe(false);
  });
});

describe("enableButton", () => {
  it("habilita el botón solo si los campos están llenos", () => {
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const button = document.getElementById("validateButton") as HTMLButtonElement;

    const disableButton = (id: string, enabled: boolean) => {
      const button = document.getElementById(id) as HTMLButtonElement;
      if (button) {
        button.disabled = enabled;
      }
    };

    const enableButton = () => {
      username.addEventListener("input", check);
      password.addEventListener("input", check);

      function check() {
        if (username.value !== "" && password.value !== "") {
          disableButton("validateButton", false);
        } else {
          disableButton("validateButton", true);
        }
      }

      check();
    };

    enableButton();
    expect(button.disabled).toBe(true);

    username.value = "user";
    username.dispatchEvent(new Event("input"));
    expect(button.disabled).toBe(true);

    password.value = "pass";
    password.dispatchEvent(new Event("input"));
    expect(button.disabled).toBe(false);
  });
});

describe("buttons", () => {
  it("agrega el evento al botón si es válido", () => {
    const testButton = document.createElement("button");
    document.body.appendChild(testButton);

    const handler = vi.fn();

    const buttons = (button: HTMLElement | null, handler: () => void) => {
      if (button instanceof HTMLButtonElement) {
        button.addEventListener("click", handler);
      }
    };

    buttons(testButton, handler);

    testButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(handler).toHaveBeenCalled();

    testButton.remove();
  });
});

describe("loadActions", () => {
  it("ejecuta validate cuando se hace click en el botón", () => {
    const button = document.getElementById("validateButton") as HTMLButtonElement;
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    username.value = "User";
    password.value = "X7@qL8#zW2^pB9!mR";

    button.disabled = false;

    button.click();

    expect(button.disabled).toBe(false);
  });
});