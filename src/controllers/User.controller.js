import bcrypt from "bcrypt";
import { UserModel } from "../models/User.model.js";

export const register = async (req, res) => {
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
};

export const login = async (req, res) => {
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
};

export const editProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserModel.findByIdAndUpdate(userId, req.body);
    await user.save();

    res.json({ message: "Updated successfully!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const follow = async (req, res) => {
  const { userId, username } = req.body;
  const user = await UserModel.findOne({ username });

  await UserModel.findByIdAndUpdate(userId, {
    $addToSet: {
      following: user._id,
    },
  });

  await UserModel.findByIdAndUpdate(user._id, {
    $addToSet: {
      followers: userId,
    },
  });

  await user.save();

  res.json({ message: "Followed" });
};

export const unfollow = async (req, res) => {
  const { userId, username } = req.body;
  const user = await UserModel.findOne({ username });

  await UserModel.findByIdAndUpdate(user._id, {
    $pull: {
      followers: userId,
    },
  });

  await UserModel.findByIdAndUpdate(userId, {
    $pull: {
      following: user._id,
    },
  });

  await user.save();

  res.json({ message: "Unfollowed" });
};
