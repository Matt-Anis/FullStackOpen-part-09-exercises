import { type DiaryEntry } from "../types";

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await fetch("http://localhost:3000/api/diaries");
  return response.json();
};

const getById = async (id: string): Promise<DiaryEntry> => {
  const response = await fetch(`http://localhost:3000/api/diaries/${id}`);
  return response.json();
};

export default {
  getAll,
  getById,
};
