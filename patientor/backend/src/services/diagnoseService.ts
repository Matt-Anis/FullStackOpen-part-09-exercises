import diagnoseEntries from "../data/diagnoses.ts";
import type { DiagnoseEntry } from "../types.ts";

const getEnteries = (): DiagnoseEntry[] => {
  return diagnoseEntries;
};

export default {
  getEnteries,
};
