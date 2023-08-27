import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    name,
    username,
    password: hashedPassword,
  });
  await newUser.save();

  res.json({ message: "Registered successfully!" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User doesn't exists!" });
  }

  const isPasswordValid = bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect!" });
  }

  res.json({ userId: user._id });
});

router.put("/edit/profile", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.findByIdAndUpdate(userId, req.body);
    await user.save();

    res.json({ message: "Updated successfully!" });
  } catch (error) {
    res.json({ message: error });
  }
});

router.put("/follow", async (req, res) => {
  const { userId, following } = req.body;

  await UserModel.findByIdAndUpdate(userId, {
    $addToSet: {
      following,
    },
  });

  await UserModel.findByIdAndUpdate(following, {
    $addToSet: {
      followers: userId,
    },
  });

  res.json({ message: "Followed" });
});

router.put("/unfollow", async (req, res) => {
  const { userId, following } = req.body;

  await UserModel.findByIdAndUpdate(userId, {
    $pull: {
      following,
    },
  });

  await UserModel.findByIdAndUpdate(following, {
    $pull: {
      followers: userId,
    },
  });

  res.json({ message: "Unfollowed" });
});

export { router as usersRouter };
