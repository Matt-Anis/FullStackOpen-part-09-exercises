import type {
  NewPatientEntry,
  NonSensitivePatientEntery,
  PatientEntry,
  Patient,
  NewEntry,
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

const addEntry = (patient: Patient, entry: NewEntry): Entry => {
  const newEntry = { ...entry, id: uuid() };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  getPatientById,
  addEntry,
};
