import express from "express";
const router = express.Router();
import { signUp, signIn, getUser, updateUser, refreshToken, getUserDetails, forgotPassword, resetPassword } from "../controllers/user.js";
import { auth } from "../middleware/auth.js"

router.post("/signin", signIn);
router.post("/refresh-token", refreshToken);
router.post("/signup", signUp);
router.get("/:email", auth, getUser);
router.put("/:email", auth, updateUser);
router.get("/get-user", auth, getUserDetails); //NOTINUSE
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
export default router;
