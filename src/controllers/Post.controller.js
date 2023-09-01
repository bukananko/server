import { PostModel } from "../models/Post.model.js";
import { UserModel } from "../models/User.model.js";

export const getPost = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("comments").populate("likes");
    res.json(posts);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const newPost = async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();

    await UserModel.findByIdAndUpdate(req.body.owner, {
      $push: {
        posts: post._id,
      },
    });

    res.json({ message: "Posted successfully!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id);

    await UserModel.findByIdAndUpdate(post.owner, {
      $pull: {
        posts: post._id,
      },
    });

    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(req.params.id, {
      $addToSet: {
        likes: req.body.userId,
      },
    });

    res.json({ message: "Liked successfully!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const dislikePost = async (req, res) => {
  try {
    await PostModel.findByIdAndUpdate(req.params.id, {
      $pull: {
        likes: req.body.userId,
      },
    });

    res.json({ message: "Disliked successfully!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
