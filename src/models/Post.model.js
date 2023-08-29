import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  caption: { type: String },
  image: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const PostModel = mongoose.model("posts", PostSchema);
