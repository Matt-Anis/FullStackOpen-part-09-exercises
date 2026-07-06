import { type DiaryEntry } from "../types";
import Diary from "./Diary";

const DiaryList = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {diaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default DiaryList;
