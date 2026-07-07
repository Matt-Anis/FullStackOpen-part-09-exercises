import {
  type NonSensitivePatientEntery,
  NewPatientEnterySchema,
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
    NewPatientEnterySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get("/", (_req, res: Response<NonSensitivePatientEntery[]>) => {
  const data = patientService.getNonSensitiveEntries();
  res.send(data);
});

router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const patient = patientService.getPatientById(req.params.id);
  if (!patient) {
    res.status(404).json({ error: "Patient not found" });
    return;
  }
  res.json(patient);
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
