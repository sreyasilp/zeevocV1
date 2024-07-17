import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import userModel from "../models/user.js";
import nodemailer from "nodemailer";
import fs from 'fs';

const secret = "code416";

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const signUp = async (req, res) => {
  const { userType } = req.params;
  const { email, password, firstName, lastName } = req.body;

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      return res.status(200).json({ isExist: true, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong: " + error });
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
      return res.status(400).json({ message: "Password Incorrect!" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "7d",
    });

    // Instead of setting token in localStorage, send it in the response body
    res.status(200).json({ message: "Sign in Successful", token });

    // Optionally, you can also set the refreshToken as a cookie here
    // res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" + err });
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

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const { email } = req.params;
  const updateData = req.body;

  if (req.file) {
    // Convert image to Base64
    const fileBuffer = fs.readFileSync(req.file.path);
    const base64Image = `data:${req.file.mimetype};base64,${fileBuffer.toString('base64')}`;
    updateData.profileImage = base64Image;

    // Optionally, delete the file after reading it
    fs.unlinkSync(req.file.path);
  }

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
  const refreshToken = req.body.token; // Expecting token in request body
  if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(refreshToken, secret);
    const newToken = jwt.sign({ email: decoded.email, id: decoded.id }, secret, { expiresIn: '1h' });
    res.status(200).json({ token: newToken, message: 'Token refreshed' }); // Return new token in response
  } catch (err) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
};

// NOT IN USE HANDLED IN FE
export const getUserDetails = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("No token found");

    const userDetails = jwtDecode(token);

    // Send the user details as a response
    return res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error decoding JWT token:", error);

    // Send an error response to the client
    return res.status(400).json({ message: "Error decoding JWT token", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "1h",
    });
    console.log(token)
    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "zeevocdigital@gmail.com", //Not working
        pass: "gbsf cxea ntln eosb",
      },
    });

    const mailOptions = {
      from: "zeevocdigital@gmail.com",
      to: user.email,
      subject: "Password Reset",
      text: `You requested a password reset. Please click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email", error });
      }
      res.status(200).json({ message: "Password reset email sent!" });
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, secret);

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await userModel.findByIdAndUpdate(decoded.id, { password: hashedPassword });

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
};
