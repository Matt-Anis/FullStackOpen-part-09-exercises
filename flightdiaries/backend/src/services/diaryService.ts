import diaryEntries from "../../data/entries.ts";
import type {
  DiaryEntry,
  NonSensitiveDiaryEntry,
  NewDiaryEntry,
} from "../types.ts";

const diaries = diaryEntries;

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): NonSensitiveDiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  if (!entry) return undefined;

  const { id: entryId, date, weather, visibility } = entry;
  return { id: entryId, date, weather, visibility };
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById,
};
