import { useEffect, useState } from "react";
import { type DiaryEntry } from "./types";
import diaryService from "./services/diaries";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";
import Notification from "./components/Notification";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaryEnteries = await diaryService.getAll();
      setDiaries(diaryEnteries);
    };

    fetchDiaries();
  }, []);

  const updateNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <Notification notification={notification} />
      <h1>Flight Diaries</h1>
      <DiaryForm setDiaries={setDiaries} setNotification={updateNotification} />
      <DiaryList diaries={diaries} />
    </div>
  );
}

export default App;
