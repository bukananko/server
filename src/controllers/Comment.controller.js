import { PostModel } from "../models/Post.model.js";
import { CommentModel } from "../models/Comment.model.js";
import { RepliesModel } from "../models/Replies.model.js";

export const getComment = async (req, res) => {
  try {
    const comments = await CommentModel.find().populate("replies");
    res.json(comments);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const newComment = async (req, res) => {
  const { comment, image, ref, owner } = req.body;

  try {
    const postNewComment = new CommentModel({
      comment,
      image,
      ref,
      owner,
    });
    await postNewComment.save();

    await PostModel.findByIdAndUpdate(req.params.postId, {
      $push: {
        comments: postNewComment._id,
      },
    });

    res.json(postNewComment);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findByIdAndDelete(req.params.commentId);

    await PostModel.findByIdAndUpdate(comment.ref, {
      $pull: {
        comments: comment._id,
      },
    });

    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const replyComment = async (req, res) => {
  const { reply, image, ref, owner } = req.body;

  try {
    const postNewReply = new RepliesModel({
      reply,
      image,
      ref,
      owner,
    });
    await postNewReply.save();

    await CommentModel.findByIdAndUpdate(req.params.commentId, {
      $push: {
        replies: postNewReply._id,
      },
    });

    res.json({ message: "Replied successfully!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteReplyComment = async (req, res) => {
  try {
    const reply = await RepliesModel.findByIdAndDelete(req.params.replyId);

    await CommentModel.findByIdAndUpdate(reply.ref, {
      $pull: {
        replies: reply._id,
      },
    });

    res.json(reply);
  } catch (error) {
    res.json({ message: error.message });
  }
};
