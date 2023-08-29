import express from "express";
import * as controller from "../controllers/Post.controller.js";

const router = express.Router();

router.post("/", controller.newPost);
router.delete("/:id", controller.deletePost);
router.put("/like/:id", controller.likePost);
router.put("/dislike/:id", controller.dislikePost);

export { router as postsRouter };
