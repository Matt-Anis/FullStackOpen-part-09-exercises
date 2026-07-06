import { z } from "zod";

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const NewEnterySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export type NewPatientEntry = z.infer<typeof NewEnterySchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string;
}

export type NonSensitivePatientEntery = Omit<PatientEntry, "ssn">;
