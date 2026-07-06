import type {
  NewPatientEntry,
  NonSensitivePatientEntery,
  PatientEntry,
  Patient,
} from "../types.ts";
import patientsEnteries from "../data/patients.ts";
import { v1 as uuid } from "uuid";

const getNonSensitiveEntries = (): NonSensitivePatientEntery[] => {
  return patientsEnteries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }),
  );
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsEnteries.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  getPatientById,
};
