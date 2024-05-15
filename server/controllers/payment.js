import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";
import Order from '../models/order.js';

export const createRazorpayOrder = async (req, res) => {
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

// Handle successful payment
export const handlePaymentSuccess = async (req, res) => {
  try {
    const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    // Find the order by its ID
    const order = await Order.findById(orderCreationId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order with payment details and set isPaid to true
    order.paymentResult = {
      id: razorpayPaymentId,
      status: 'success', // You can customize this based on your business logic
      updateTime: new Date().toISOString(),
      emailAddress: order.user.email // Assuming user has an email field
    };
    order.isPaid = true;
    order.paidAt = new Date();

    // Save the updated order
    const updatedOrder = await order.save();

    // Perform any other necessary actions here, like sending confirmation emails, etc.

    // Return success response
    res.status(200).json({ message: 'Payment successful', order: updatedOrder });
  } catch (error) {
    console.error('Error handling payment success:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};