import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
const app = express();
app.use(express.json());

app.get("/hello", (_, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  try {
    const result = calculateBmi(Number(height), Number(weight));
    res.status(200).json(result);
  } catch {
    res.status(400).json({ error: "malformatted parameters" });
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

app.post("/exercises", (req, res) => {
  const body = req.body as Record<string, unknown>;

  if (!("daily_exercises" in body) || !("target" in body)) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (!isExerciseBody(body)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const { daily_exercises, target } = body;
  const result = calculateExercises(daily_exercises, target);
  res.status(200).json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Sevrer running on port ${PORT}`);
});
