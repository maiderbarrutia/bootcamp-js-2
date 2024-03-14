import { ValidacionClave } from "./modelo";

//1-La clave debe de tener mayúsculas y minúsculas.
export const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
  const contieneMayuscula = clave !== clave.toLowerCase();
  const contieneMinuscula = clave !== clave.toUpperCase();
  if (contieneMayuscula && contieneMinuscula) {
    return { esValida: true };
  } else {
    return {
      esValida: false,
      error: "La clave debe de tener mayúsculas y minúsculas",
    };
  }
};

//2- La clave debe de tener números.
export const tieneNumeros = (clave: string): ValidacionClave => {
  for (let i = 0; i < clave.length; i++) {
    const character = clave[i];
    if (!isNaN(parseInt(character))) {
      return { esValida: true };
    }
  }

  return {
    esValida: false,
    error: "La clave debe tener números",
  };
};

//3- La clave debe de tener caracteres especiales (@,#,+, _, ...)
export const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
  const caracteresEspeciales = ["@", "#", "+", "_", "&"];
  const contieneCaracteresEspeciales = caracteresEspeciales.some((caracter) =>
    clave.includes(caracter)
  );
  if (!contieneCaracteresEspeciales) {
    return {
      esValida: false,
      error: "La clave no tiene carácteres especiales",
    };
  } else {
    return { esValida: true };
  }
};

//4- La clave debe de tener una longitud mínima de 8 caracteres.
export const tieneLongitudMinima = (clave: string): ValidacionClave => {
  if (clave.length < 8) {
    return {
      esValida: false,
      error: "La clave no tiene el nombre del usuario",
    };
  } else {
    return { esValida: true };
  }
};

//5-La clave no debe tener el nombre del usuario.
export const tieneNombreUsuario = (
  nombreUsuario: string,
  clave: string
): ValidacionClave => {
  const lowerCaseUsuario = nombreUsuario.toLowerCase();
  const lowerCaseClave = clave.toLowerCase();

  if (lowerCaseClave.includes(lowerCaseUsuario)) {
    return {
      esValida: false,
      error: "La clave no puede contener el nombre del usuario",
    };
  } else {
    return { esValida: true };
  }
};

//6-La clave no debe de contener palabras comunes (le pasaremos un array de palabras comunes).
export const tienePalabrasComunes = (
  clave: string,
  commonPasswords: string[]
): ValidacionClave => {
  const lowerCaseClave = clave.toLowerCase();
  const contienePalabraComun = commonPasswords.some((commonPassword) =>
    lowerCaseClave.includes(commonPassword.toLowerCase())
  );

  if (contienePalabraComun) {
    return {
      esValida: false,
      error: "La clave no debería tener palabras comunes",
    };
  } else {
    return { esValida: true };
  }
};

// export const validarClave = (
//   nombreUsuario: string,
//   clave: string,
//   commonPasswords: string[]
// ): ValidacionClave => {
//   const validaciones: ValidacionClave[] = [
//     tieneMayusculasYMinusculas(clave),
//     tieneNumeros(clave),
//     tieneCaracteresEspeciales(clave),
//     tieneLongitudMinima(clave),
//     tieneNombreUsuario(nombreUsuario, clave),
//     tienePalabrasComunes(clave, commonPasswords),
//   ];

//   // Buscar si hay alguna validación que no sea válida
//   const fallaLaValidacion = validaciones.find(
//     (validacion) => validacion.esValida === false
//   );

//   // Si alguna validación falla, devolvemos el error
//   if (fallaLaValidacion) {
//     return fallaLaValidacion;
//   } else {
//     // Si todas las validaciones son válidas, devolvemos true
//     return { esValida: true };
//   }
// };

export const validarClave = (
  nombreUsuario: string,
  clave: string,
  commonPasswords: string[]
): ValidacionClave[] => {
  const validaciones: ValidacionClave[] = [
    tieneMayusculasYMinusculas(clave),
    tieneNumeros(clave),
    tieneCaracteresEspeciales(clave),
    tieneLongitudMinima(clave),
    tieneNombreUsuario(nombreUsuario, clave),
    tienePalabrasComunes(clave, commonPasswords),
  ];

  const errores: ValidacionClave[] = [];

  // Recorrer todas las validaciones
  validaciones.forEach((validacion) => {
    if (!validacion.esValida) {
      errores.push(validacion);
    }
  });

  return errores;
};
