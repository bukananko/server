import express from "express";
import * as controller from "../controllers/User.controller.js";

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.put("/edit/profile", controller.editProfile);
router.put("/follow", controller.follow);
router.put("/unfollow", controller.unfollow);

export { router as usersRouter };
