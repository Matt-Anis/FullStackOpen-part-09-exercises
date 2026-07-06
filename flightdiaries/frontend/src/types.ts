export interface DiaryEntry {
  id: string;
  date: string;
  weather: "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
  visibility: "great" | "good" | "ok" | "poor";
  comment?: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
