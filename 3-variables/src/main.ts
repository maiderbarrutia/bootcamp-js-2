import "./style.css";

//INTERFAZ
interface GrupoMusical {
  nombreGrupo: string;
  anioFundacion: number;
  activo: boolean;
  generoMusical: string;
}

//VARIABLES PARA CADA GRUPO MUSICAL
const grupoA: GrupoMusical = {
  nombreGrupo: "The Beatles",
  anioFundacion: 1960,
  activo: true,
  generoMusical: "🎵 Pop Rock",
};
const grupoB: GrupoMusical = {
  nombreGrupo: "Queen",
  anioFundacion: 1970,
  activo: false,
  generoMusical: "🎸 Rock",
};
const grupoC: GrupoMusical = {
  nombreGrupo: "AC DC",
  anioFundacion: 1973,
  activo: true,
  generoMusical: "🤘 Hard Rock",
};
const grupoD: GrupoMusical = {
  nombreGrupo: "Ludwig van Beethoven",
  anioFundacion: 1770,
  activo: false,
  generoMusical: "🎼 Clásica",
};
const grupoE: GrupoMusical = {
  nombreGrupo: "The Rolling Stones",
  anioFundacion: 1962,
  activo: true,
  generoMusical: "🎸 Rock",
};

//ESTILOS
const groupStyle = "font-weight:bold;font-size:20px;background-color:green;";

//MOSTRAR POR CONSOLA LOS GRUPOS
//GRUPO A
/* Modo 1 */
console.log(`%c${grupoA.nombreGrupo}`, groupStyle);
console.log(grupoA.anioFundacion);
console.log(grupoA.activo);
console.log(grupoA.generoMusical);

/* Modo 2*/
console.log(grupoA);

/* Modo 3 */
console.log(
  `${grupoA.nombreGrupo}, ${grupoA.anioFundacion}, ${grupoA.activo}, ${grupoA.generoMusical}`
);

//GRUPO B
/* Modo 1 */
console.log("%c" + grupoB.nombreGrupo, groupStyle);
console.log(grupoB.anioFundacion);
console.log(grupoB.activo);
console.log(grupoB.generoMusical);

/* Modo 2*/
console.log(grupoB);

/* Modo 3 */
console.log(
  `${grupoB.nombreGrupo}, ${grupoB.anioFundacion}, ${grupoB.activo}, ${grupoB.generoMusical}`
);

//GRUPO C
/* Modo 1 */
console.log("%c" + grupoC.nombreGrupo, groupStyle);
console.log(grupoC.anioFundacion);
console.log(grupoC.activo);
console.log(grupoC.generoMusical);

/* Modo 2*/
console.log(grupoC);

/* Modo 3 */
console.log(
  `${grupoC.nombreGrupo}, ${grupoC.anioFundacion}, ${grupoC.activo}, ${grupoC.generoMusical}`
);

//GRUPO D
/* Modo 1 */
console.log("%c" + grupoD.nombreGrupo, groupStyle);
console.log(grupoD.anioFundacion);
console.log(grupoD.activo);
console.log(grupoD.generoMusical);

/* Modo 2*/
console.log(grupoD);

/* Modo 3 */
console.log(
  `${grupoD.nombreGrupo}, ${grupoD.anioFundacion}, ${grupoD.activo}, ${grupoD.generoMusical}`
);

//GRUPO E
/* Modo 1 */
console.log("%c " + grupoE.nombreGrupo, groupStyle);
console.log(grupoE.anioFundacion);
console.log(grupoE.activo);
console.log(grupoE.generoMusical);

/* Modo 2*/
console.log(grupoE);

/* Modo 3 */
console.log(
  `${grupoE.nombreGrupo}, ${grupoE.anioFundacion}, ${grupoE.activo}, ${grupoE.generoMusical}`
);
