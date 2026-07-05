import type { NonSensitivePatientEntery } from "../types.ts";
import patientService from "../services/PatientService.ts";
import parseNewPatientEntry from "../utils.ts";
import express, { type Response } from "express";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntery[]>) => {
  const data = patientService.getNonSensitiveEntries();
  res.send(data);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = parseNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
