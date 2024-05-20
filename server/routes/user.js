import express from "express";
const router = express.Router();
import { signUp, signIn, getUser, updateUser, refreshToken, getUserDetails } from "../controllers/user.js";
import { auth } from "../middleware/auth.js"

router.post("/signin", signIn);
router.post("/refresh-token", refreshToken);
router.post("/signup", signUp);
router.get("/:email",auth, getUser);  // Add this route to get user by email
router.put("/:email", auth, updateUser);  // Add this route to update user by email
router.get("/get-user",auth, getUserDetails); //NOTINUSE HANDLED IN FE
export default router;
