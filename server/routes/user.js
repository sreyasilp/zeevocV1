import express from "express";
const router = express.Router();
import { signUp, signIn } from "../controllers/user.js";
import {  updateByEmail, getByEmail } from "../controllers/profile.js";

router.post("/signin", signIn);
router.post("/signup", signUp);
router.put("/updateprofile/:email",updateByEmail)
router.get("/getbyemail/:email", getByEmail);

export default router; 
