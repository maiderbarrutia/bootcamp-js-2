import {
  obtenPacientesAsignadosAPediatria,
  obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios,
  activarProtocoloUrgencia,
  reasignaPacientesAMedicoFamilia,
  hayPacientesDePediatria,
  cuentaPacientesPorEspecialidad,
} from "./motor";
import { pacientes } from "./modelo";

// LLAMAR A LAS FUNCIONES
function llamada() {
  console.log("-------------- APARTADO 1-A ----------------------");

  const pacientesPediatria = obtenPacientesAsignadosAPediatria(pacientes);
  console.log(pacientesPediatria);

  console.log("----------------- APARTADO 1-B -------------------");

  const pacientesPediatriaYmenorDiez =
    obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios(pacientes);
  console.log(pacientesPediatriaYmenorDiez);

  console.log("---------------- APARTADO 2 --------------------");

  const protocoloUrgencia = activarProtocoloUrgencia(pacientes);
  console.log(protocoloUrgencia);

  console.log("----------------- APARTADO 3 -------------------");

  const reasignarPacientes = reasignaPacientesAMedicoFamilia(pacientes);
  console.log(reasignarPacientes);

  console.log("------------------ APARTADO 4 ------------------");

  const pacientesDePediatria = hayPacientesDePediatria(pacientes);
  console.log(pacientesDePediatria);

  console.log("------------------ APARTADO 5 ------------------");

  const pacientesPorEspecialidad = cuentaPacientesPorEspecialidad(pacientes);
  console.log(pacientesPorEspecialidad);
}

document.addEventListener("DOMContentLoaded", llamada);
