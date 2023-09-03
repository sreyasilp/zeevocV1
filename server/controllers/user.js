import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModel from "../models/user.js";

const secret = "code416";

export const signUp = async (req, res) => {
  let { userType } = req.params;
  const { email, password, firstName, lastName } = req.body;
  userType = typeof userType !== "undefined" ? userType : "buyer";
  try {
    const oldUser = await userModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await userModel.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Sign in Successfull", token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
