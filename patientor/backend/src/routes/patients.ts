import type { NonSensitivePatientEntery } from "../types.ts";
import patientService from "../services/PatientService.ts";
import express, { type Response } from "express";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntery[]>) => {
  const data = patientService.getNonSensitiveEntries();
  res.send(data);
});

export default router;
