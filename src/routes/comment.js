import express from "express";
import * as controller from "../controllers/Comment.controller.js";

const router = express.Router();

router.get("/", controller.getComment);
router.post("/:postId", controller.newComment);
router.delete("/:commentId", controller.deleteComment);
router.post("/reply/:commentId", controller.replyComment);
router.delete("/reply/:replyId", controller.deleteReplyComment);

export { router as commentsRouter };
