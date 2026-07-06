import { type DiaryEntry } from "../types";

const Diary = ({ diary }: { diary: DiaryEntry }) => {
  return (
    <div>
      <h3>Date: {diary.date}</h3>
      <p>Weather: {diary.weather}</p>
      <p>Visibility: {diary.visibility}</p>
    </div>
  );
};

export default Diary;
