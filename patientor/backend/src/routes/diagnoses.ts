import express, { type Response } from "express";
import diagnoseService from "../services/diagnoseService.ts";
import type { DiagnoseEntry } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<DiagnoseEntry[]>) => {
  const data = diagnoseService.getEnteries();
  res.send(data);
});

export default router;
