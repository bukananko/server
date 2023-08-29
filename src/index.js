import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { usersRouter } from "./routes/users.js";
import { postsRouter } from "./routes/posts.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", usersRouter);
app.use("/post", postsRouter);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(3001, () => console.log("server running on http://localhost:3001"));
