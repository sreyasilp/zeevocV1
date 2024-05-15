import express from "express";
const router = express.Router();
import { signUp, signIn, getUser, updateUser } from "../controllers/user.js";

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/:email", getUser);  // Add this route to get user by email
router.put("/:email", updateUser);  // Add this route to update user by email

export default router;
