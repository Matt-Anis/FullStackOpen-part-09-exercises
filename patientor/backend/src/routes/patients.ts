import {
  type NonSensitivePatientEntery,
  NewEnterySchema,
  type PatientEntry,
  type NewPatientEntry,
} from "../types.ts";
import patientService from "../services/PatientService.ts";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEnterySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get("/", (_req, res: Response<NonSensitivePatientEntery[]>) => {
  const data = patientService.getNonSensitiveEntries();
  res.send(data);
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientEntry>,
  ) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  },
);

export default router;
