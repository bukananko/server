import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  ref: { type: mongoose.Schema.Types.ObjectId, ref: "posts", required: true },
  comment: { type: String },
  image: { type: String },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "replies" }],
});

export const CommentModel = mongoose.model("comments", CommentSchema);
