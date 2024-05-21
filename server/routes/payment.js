import express from "express";
import { createRazorpayOrder ,handlePaymentSuccess} from "../controllers/payment.js";
import { auth } from "../middleware/auth.js"

const router = express.Router();

router.post("/createrporder", auth, createRazorpayOrder);
router.post("/success", auth, handlePaymentSuccess);

export default router;
