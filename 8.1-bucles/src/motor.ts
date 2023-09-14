import { Pacientes, NumeroPacientesPorEspecialidad } from "./modelo";

// APARTADO 1-A: EXTRAER LISTA DE PACIENTES ASIGNADOS A LA ESPECIALIDAD PEDIATRÍA (motor.ts)
export const obtenPacientesAsignadosAPediatria = (
  pacientes: Pacientes[]
): Pacientes[] => {
  const pacientesPediatria: Pacientes[] = [];

  for (let i = 0; i < pacientes.length; i++) {
    const paciente = pacientes[i];
    if (paciente.especialidad === "Pediatra") {
      pacientesPediatria[pacientesPediatria.length] = paciente;
    }
  }

  return pacientesPediatria;
};

// APARTADO 1-B: EXTRAER LISTA DE PACIENTES ASIGNADOS A LA ESPECIALIDAD PEDIATRÍA Y QUE TENGAN UNA EDAD MENOR DE 10 AÑOS (motor.ts)
export const obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios = (
  pacientes: Pacientes[]
): Pacientes[] => {
  const pacientesPediatriaYmenorDiez: Pacientes[] = [];

  for (let i = 0; i < pacientes.length; i++) {
    const paciente = pacientes[i];
    if (paciente.especialidad === "Pediatra" && paciente.edad < 10) {
      pacientesPediatriaYmenorDiez[pacientesPediatriaYmenorDiez.length] =
        paciente;
    }
  }

  return pacientesPediatriaYmenorDiez;
};

//APARTADO 2: ACTIVAR PROTOCOLO DE URGENCIA
export const activarProtocoloUrgencia = (pacientes: Pacientes[]): boolean => {
  let activarProctolo = false;

  for (let i = 0; i < pacientes.length; i++) {
    const paciente = pacientes[i];
    if (paciente.frecuenciaCardiaca > 100 && paciente.temperatura > 39) {
      activarProctolo = true;
    }
  }

  return activarProctolo;
};

// APARTADO 3: REASIGNAR LOS PACIENTES ASIGNADOS A LA ESPECIALIDAD DE PEDIATRIA A LA DE MÉDICO DE FAMILIA
export const reasignaPacientesAMedicoFamilia = (
  pacientes: Pacientes[]
): Pacientes[] => {
  const pacientesPediatria: Pacientes[] = [];

  for (let i = 0; i < pacientes.length; i++) {
    const paciente = pacientes[i];
    if (paciente.especialidad === "Pediatra") {
      paciente.especialidad = "Medico de familia";
      pacientesPediatria[pacientesPediatria.length] = paciente;
    }
  }

  return pacientesPediatria;
};

// APARTADO 4: COMPROBAR SI HAY ALGÚN PACIENTE ASIGNADO A PEDIATRÍA
export const hayPacientesDePediatria = (pacientes: Pacientes[]): boolean => {
  let pacientesAsignados = false;

  for (let i = 0; i < pacientes.length; i++) {
    const paciente = pacientes[i];
    if (paciente.especialidad === "Pediatra") {
      pacientesAsignados = true;
    }
  }

  return pacientesAsignados;
};

// APARTADO 5: CALCULAR EL NUMERO TOTAL DE PACIENTES QUE ESTÁN ASIGNADOS A ESPECIALIDAD DE MÉDICO DE FAMILIA Y LOS QUE ESTÁN ASIGNADOS A PEDIATRIA Y CARDIOLOGÍA

//MODO 1
// export const cuentaPacientesPorEspecialidad = (
//   pacientes: Pacientes[]
// ): NumeroPacientesPorEspecialidad => {
//   const medicoDeFamilia: Pacientes[] = [];
//   const pacientesPediatria: Pacientes[] = [];
//   const cardiologia: Pacientes[] = [];

//   for (let i = 0; i < pacientes.length; i++) {
//     const paciente = pacientes[i];
//     if (paciente.especialidad === "Medico de familia") {
//       medicoDeFamilia[medicoDeFamilia.length] = paciente;
//     } else if (paciente.especialidad === "Pediatra") {
//       pacientesPediatria[pacientesPediatria.length] = paciente;
//     } else if (paciente.especialidad === "Cardiólogo") {
//       cardiologia[cardiologia.length] = paciente;
//     }
//   }

//   return {
//     medicoDeFamilia: medicoDeFamilia.length,
//     pediatria: pacientesPediatria.length,
//     cardiologia: cardiologia.length,
//   };
// };

//MODO 2
export const cuentaPacientesPorEspecialidad = (
  pacientes: Pacientes[]
): NumeroPacientesPorEspecialidad => {
  const numeroPacientes = {
    medicoDeFamilia: 0,
    pediatria: 0,
    cardiologia: 0,
  };

  for (let i = 0; i < pacientes.length; i++) {
    const paciente = pacientes[i];
    if (paciente.especialidad === "Medico de familia") {
      numeroPacientes.medicoDeFamilia++;
      /*Aumenta en 1 el valor existente (0) de la propiedad y es equivalente a: 
      numeroPacientes.medicoDeFamilia = numeroPacientes.medicoDeFamilia + 1;*/
      console.log(numeroPacientes.medicoDeFamilia);
    } else if (paciente.especialidad === "Pediatra") {
      numeroPacientes.pediatria++;
    } else if (paciente.especialidad === "Cardiólogo") {
      numeroPacientes.cardiologia++;
    }
  }

  return numeroPacientes;
};
