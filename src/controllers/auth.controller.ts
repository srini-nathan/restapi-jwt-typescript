import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
  const user: IUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  user.password = await user.encryptPassword(user.password);

  const savedUser = await user.save();

  const token: string = jwt.sign(
    { _id: savedUser._id },
    process.env.JWT_TOKEN_SECRET
  );

  res.header("auth-token", token).json(savedUser);
};

export const signIn = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Email / Password invalid" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid Password" });

  const token: string = jwt.sign(
    { _id: user._id },
    process.env.JWT_TOKEN_SECRET,
    { expiresIn: 60 * 60 * 24 }
  );

  res.header("auth-token", token).json(user);
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) return res.status(404).json("No User Found");
  res.json(user);
};
