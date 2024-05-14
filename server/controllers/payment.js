import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";

const createRazorpayOrder = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        // const options = {
        //     amount: 100, // amount in smallest currency unit
        //     currency: "INR",
        //     receipt: "receipt_order_74394",
        // };
        const { amount, currency, receipt } = req.body;
        const options = {
            amount,
            currency,
            receipt,
        };
        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occurred");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
};

export { createRazorpayOrder };
