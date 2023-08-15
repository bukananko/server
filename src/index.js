import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hi this from server");
});

app.listen(5000, () => console.log("server running on http://localhost:5000"));
