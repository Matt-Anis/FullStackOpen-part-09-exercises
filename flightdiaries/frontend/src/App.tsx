import { useEffect, useState } from "react";
import { type DiaryEntry } from "./types";
import diaryService from "./services/diaries";
import DiaryList from "./components/DiaryList";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaryEnteries = await diaryService.getAll();
      setDiaries(diaryEnteries);
    };

    fetchDiaries();
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;
