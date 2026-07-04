import express from "express";
const app = express();

app.get("/hello", (_, res) => {
  res.send("hello fullstack");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Sevrer running on port ${PORT}`);
});
