import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { usersRouter } from "./routes/users.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", usersRouter);

app.get("/", (req, res) => {
  res.send("hi this from server");
});

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => console.log("server running on http://localhost:5000"));
