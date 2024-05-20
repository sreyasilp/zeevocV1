import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import jwtDecode from "jwt-decode";

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

    const refreshToken = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "7d",
    });

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });

    res.status(200).json({ message: "Sign in Successful" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await userModel.findOne({ email }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const { email } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await userModel.findOneAndUpdate({ email }, updateData, { new: true }).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(refreshToken, secret);
    const newToken = jwt.sign({ email: decoded.email, id: decoded.id }, secret, { expiresIn: '1h' });

    res.cookie('token', newToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(200).json({ message: 'Token refreshed' });
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};



export const isAuthenticated = () => {
  const token = getCookie('token');
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const getUserDetails = () => {
  const token = getCookie('token');
  if (!token) return null;

  try {
    const userDetails = jwtDecode(token);
    return userDetails;
  } catch (e) {
    return null;
  }
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};
