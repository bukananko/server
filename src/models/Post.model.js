import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  caption: { type: String, required: true },
  image: { type: String, required: true },
  comment: [
    { type: mongoose.Schema.Types.ObjectId, ref: "comments", required: true },
  ],
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  ],
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const PostModel = mongoose.model("posts", PostSchema);
