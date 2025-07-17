import { describe, it, expect } from "vitest";
import {
  tieneMayusculasYMinusculas,
  tieneNumeros,
  tieneCaracteresEspeciales,
  tieneLongitudMinima,
  tieneNombreUsuario,
  tienePalabrasComunes,
  validarClave,
} from "./motor";

const commonPasswords = ["password", "123456", "qwerty"];

describe("Validación de clave", () => {
  it("tieneMayusculasYMinusculas: detecta mayúsculas y minúsculas", () => {
    expect(tieneMayusculasYMinusculas("Abc")).toEqual({ esValida: true });
    expect(tieneMayusculasYMinusculas("abc")).toEqual({
      esValida: false,
      error: "La clave debe de tener mayúsculas y minúsculas",
    });
    expect(tieneMayusculasYMinusculas("ABC")).toEqual({
      esValida: false,
      error: "La clave debe de tener mayúsculas y minúsculas",
    });
  });

  it("tieneNumeros: detecta números en la clave", () => {
    expect(tieneNumeros("abc1")).toEqual({ esValida: true });
    expect(tieneNumeros("abcdef")).toEqual({
      esValida: false,
      error: "La clave debe tener números",
    });
  });

  it("tieneCaracteresEspeciales: detecta caracteres especiales", () => {
    expect(tieneCaracteresEspeciales("abc!")).toEqual({ esValida: true });
    expect(tieneCaracteresEspeciales("abc123")).toEqual({
      esValida: false,
      error: "La clave debe contener al menos un carácter especial",
    });
  });

  it("tieneLongitudMinima: valida la longitud mínima", () => {
    expect(tieneLongitudMinima("12345678")).toEqual({ esValida: true });
    expect(tieneLongitudMinima("1234")).toEqual({
      esValida: false,
      error: "La clave debe tener al menos 8 caracteres",
    });
  });

  it("tieneNombreUsuario: verifica que la clave no contenga el nombre", () => {
    expect(tieneNombreUsuario("user", "claveUser")).toEqual({
      esValida: false,
      error: "La clave no puede contener el nombre del usuario",
    });
    expect(tieneNombreUsuario("user", "clave123")).toEqual({ esValida: true });
  });

  it("tienePalabrasComunes: detecta palabras comunes", () => {
    expect(tienePalabrasComunes("mypassword123", commonPasswords)).toEqual({
      esValida: false,
      error: "La clave no debería tener palabras comunes",
    });
    expect(tienePalabrasComunes("myp@ssw0rd", commonPasswords)).toEqual({
      esValida: true,
    });
  });

  it("validarClave: devuelve lista de errores para claves inválidas", () => {
    const errores = validarClave("user", "abc", commonPasswords);
    expect(errores.length).toBeGreaterThan(0);
  });

  it("validarClave: devuelve lista vacía para clave válida", () => {
    const errores = validarClave("user", "Abcdef1@", commonPasswords);
    expect(errores.length).toBe(0);
  });
});
