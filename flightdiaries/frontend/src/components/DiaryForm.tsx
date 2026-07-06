import { type NewDiaryEntry, type DiaryEntry } from "../types";
import { useState } from "react";
import diaryService from "../services/diaries";

interface DiaryFormProps {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const DiaryForm = ({ setDiaries }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<NewDiaryEntry["weather"]>("sunny");
  const [visibility, setVisibility] =
    useState<NewDiaryEntry["visibility"]>("great");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    const newDiaryEntry = await diaryService.addDiary(newEntry);
    setDiaries((prevDiaries) => [...prevDiaries, newDiaryEntry]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Diary Entry</h2>
      <div>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Weather:
          <select
            value={weather}
            onChange={(e) =>
              setWeather(e.target.value as NewDiaryEntry["weather"])
            }
          >
            <option value="sunny">Sunny</option>
            <option value="rainy">Rainy</option>
            <option value="cloudy">Cloudy</option>
            <option value="stormy">Stormy</option>
            <option value="windy">Windy</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Visibility:
          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value as NewDiaryEntry["visibility"])
            }
          >
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="ok">Ok</option>
            <option value="poor">Poor</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Comment:
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Add Diary Entry</button>
    </form>
  );
};

export default DiaryForm;
