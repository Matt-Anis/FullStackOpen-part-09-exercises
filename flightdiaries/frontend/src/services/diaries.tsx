import { type DiaryEntry, type NewDiaryEntry } from "../types";

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await fetch("http://localhost:3000/api/diaries");
  return response.json();
};

const getById = async (id: string): Promise<DiaryEntry> => {
  const response = await fetch(`http://localhost:3000/api/diaries/${id}`);
  return response.json();
};

const addDiary = async (newDiary: NewDiaryEntry): Promise<DiaryEntry> => {
  try {
    const response = await fetch("http://localhost:3000/api/diaries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDiary),
    });
    return response.json();
  } catch {
    throw new Error("Failed to add diary entry");
  }
};

export default {
  getAll,
  getById,
  addDiary,
};
