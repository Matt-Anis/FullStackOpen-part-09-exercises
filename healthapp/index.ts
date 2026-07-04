import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
const app = express();
app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("hello fullstack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  try {
    const result = calculateBmi(Number(height), Number(weight));
    res.json(result);
  } catch {
    res.json({ error: "malformatted parameters" });
  }
});

const isExerciseBody = (
  body: unknown,
): body is { daily_exercises: number[]; target: number } => {
  return (
    typeof body === "object" &&
    body !== null &&
    "daily_exercises" in body &&
    "target" in body &&
    Array.isArray((body as { daily_exercises: unknown }).daily_exercises) &&
    (body as { daily_exercises: unknown[] }).daily_exercises.every(
      (d) => typeof d === "number",
    ) &&
    typeof (body as { target: unknown }).target === "number"
  );
};

app.post("/exercise", (req, res) => {
  if (!isExerciseBody(req.body)) {
    res.status(400).json({ error: "malformatted body" });
    return;
  }

  const { daily_exercises, target } = req.body;
  const result = calculateExercises(daily_exercises, target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Sevrer running on port ${PORT}`);
});
