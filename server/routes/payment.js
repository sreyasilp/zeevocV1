import express from "express";
import { createRazorpayOrder } from "../controllers/payment.js";

const router = express.Router();

router.post("/createrporder", createRazorpayOrder);
router.post("/success");

export default router;
