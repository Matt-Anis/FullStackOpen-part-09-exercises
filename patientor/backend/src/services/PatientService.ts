import type { NonSensitivePatientEntery } from "../types.ts";
import patientsEnteries from "../data/patients.ts";

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

export default {
  getNonSensitiveEntries,
};
