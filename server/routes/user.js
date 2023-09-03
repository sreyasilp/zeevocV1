import express from "express";
const router = express.Router();
import { signUp, signIn } from "../controllers/user.js";

router.post("/signin", signIn);
router.post("/signup/userType", signUp);

export default router;
