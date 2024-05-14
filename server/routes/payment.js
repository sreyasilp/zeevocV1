import express from "express";
import { createRazorpayOrder } from "../controllers/payment.js";

const router = express.Router();

router.post("/orders", createRazorpayOrder);

export default router;
