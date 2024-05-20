import express from "express";
const router = express.Router();
import { signUp, signIn, getUser, updateUser, refreshToken } from "../controllers/user.js";
import { auth } from "../middleware/auth.js"

router.post("/signin", signIn);
router.post("/refresh-token", refreshToken);
router.post("/signup", signUp);
router.get("/:email",auth, getUser);  // Add this route to get user by email
router.put("/:email", auth, updateUser);  // Add this route to update user by email

export default router;
