import { Pacientes, NumeroPacientesPorEspecialidad } from "./modelo";

// APARTADO 1-A: EXTRAER LISTA DE PACIENTES ASIGNADOS A LA ESPECIALIDAD PEDIATRÍA
export const obtenPacientesAsignadosAPediatria = (
  pacientes: Pacientes[]
): Pacientes[] => {
  const pacientesPediatria = pacientes.filter(
    (paciente) => paciente.especialidad === "Pediatra"
  );
  return pacientesPediatria;
};

// APARTADO 1-B: EXTRAER LISTA DE PACIENTES ASIGNADOS A LA ESPECIALIDAD PEDIATRÍA Y QUE TENGAN UNA EDAD MENOR DE 10 AÑOS (motor.ts)
export const obtenPacientesAsignadosAPediatriaYMenorDeDiezAnios = (
  pacientes: Pacientes[]
): Pacientes[] => {
  const pacientesPediatriaYmenorDiez = pacientes.filter(
    (paciente) => paciente.especialidad === "Pediatra" && paciente.edad > 10
  );
  return pacientesPediatriaYmenorDiez;
};

//APARTADO 2: ACTIVAR PROTOCOLO DE URGENCIA
export const activarProtocoloUrgencia = (pacientes: Pacientes[]): boolean => {
  let activarProctolo = false;

  activarProctolo = pacientes.some(
    (paciente) => paciente.frecuenciaCardiaca > 100 && paciente.temperatura > 39
  );

  return activarProctolo;
};

// APARTADO 3: REASIGNAR LOS PACIENTES ASIGNADOS A LA ESPECIALIDAD DE PEDIATRIA A LA DE MÉDICO DE FAMILIA
export const reasignaPacientesAMedicoFamilia = (
  pacientes: Pacientes[]
): Pacientes[] => {
  const pacientesReasignados: Pacientes[] = pacientes.map((paciente) => {
    if (paciente.especialidad === "Pediatra") {
      return { ...paciente, especialidad: "Medico de familia" };
    } else {
      return paciente;
    }
    // paciente.especialidad === "Pediatra" ? { ...paciente, especialidad: "Medico de familia"} : paciente;
  });

  return pacientesReasignados;
};

// APARTADO 4: COMPROBAR SI HAY ALGÚN PACIENTE ASIGNADO A PEDIATRÍA
export const hayPacientesDePediatria = (pacientes: Pacientes[]): boolean => {
  let pacientesAsignados = false;

  pacientesAsignados = pacientes.some(
    (paciente) => paciente.especialidad === "Pediatra"
  );

  return pacientesAsignados;
};

// APARTADO 5: CALCULAR EL NUMERO TOTAL DE PACIENTES QUE ESTÁN ASIGNADOS A ESPECIALIDAD DE MÉDICO DE FAMILIA Y LOS QUE ESTÁN ASIGNADOS A PEDIATRIA Y CARDIOLOGÍA
export const cuentaPacientesPorEspecialidad = (
  pacientes: Pacientes[]
): NumeroPacientesPorEspecialidad => {
  const numeroPacientes = pacientes.reduce(
    (acc, paciente) => {
      if (paciente.especialidad === "Medico de familia") {
        acc.medicoDeFamilia++;
      } else if (paciente.especialidad === "Pediatra") {
        acc.pediatria++;
      } else if (paciente.especialidad === "Cardiólogo") {
        acc.cardiologia++;
      }
      return acc;
    },
    { medicoDeFamilia: 0, pediatria: 0, cardiologia: 0 }
  );
  return numeroPacientes;
};
