import { type NewDiaryEntry, type DiaryEntry } from "../types";
import { useState } from "react";
import diaryService from "../services/diaries";

interface DiaryFormProps {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  setNotification: React.Dispatch<React.SetStateAction<string | null>>;
}

const DiaryForm = ({ setDiaries, setNotification }: DiaryFormProps) => {
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
    try {
      const newDiaryEntry = await diaryService.addDiary(newEntry);
      setDiaries((prevDiaries) => [...prevDiaries, newDiaryEntry]);
    } catch (error) {
      setNotification(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
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
          <input
            type="radio"
            name="weather"
            value="sunny"
            checked={weather === "sunny"}
            onChange={(e) =>
              setWeather(e.target.value as NewDiaryEntry["weather"])
            }
          />
          Sunny
          <input
            type="radio"
            name="weather"
            value="rainy"
            checked={weather === "rainy"}
            onChange={(e) =>
              setWeather(e.target.value as NewDiaryEntry["weather"])
            }
          />
          Rainy
          <input
            type="radio"
            name="weather"
            value="cloudy"
            checked={weather === "cloudy"}
            onChange={(e) =>
              setWeather(e.target.value as NewDiaryEntry["weather"])
            }
          />
          Cloudy
          <input
            type="radio"
            name="weather"
            value="stormy"
            checked={weather === "stormy"}
            onChange={(e) =>
              setWeather(e.target.value as NewDiaryEntry["weather"])
            }
          />
          Stormy
          <input
            type="radio"
            name="weather"
            value="windy"
            checked={weather === "windy"}
            onChange={(e) =>
              setWeather(e.target.value as NewDiaryEntry["weather"])
            }
          />
          Windy
        </label>
      </div>
      <div>
        <label>
          Visibility:
          <input
            type="radio"
            name="visibility"
            value="great"
            checked={visibility === "great"}
            onChange={(e) =>
              setVisibility(e.target.value as NewDiaryEntry["visibility"])
            }
          />
          Great
          <input
            type="radio"
            name="visibility"
            value="good"
            checked={visibility === "good"}
            onChange={(e) =>
              setVisibility(e.target.value as NewDiaryEntry["visibility"])
            }
          />
          Good
          <input
            type="radio"
            name="visibility"
            value="ok"
            checked={visibility === "ok"}
            onChange={(e) =>
              setVisibility(e.target.value as NewDiaryEntry["visibility"])
            }
          />
          Ok
          <input
            type="radio"
            name="visibility"
            value="poor"
            checked={visibility === "poor"}
            onChange={(e) =>
              setVisibility(e.target.value as NewDiaryEntry["visibility"])
            }
          />
          Poor
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
