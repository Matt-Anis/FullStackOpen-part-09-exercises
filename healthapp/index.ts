import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Sevrer running on port ${PORT}`);
});
