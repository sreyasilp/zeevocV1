import express from 'express';
const router = express.Router();
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder,getOrdersByUserId } from '../controllers/order.js';
import { auth, adminAuth } from "../middleware/auth.js"

router.post('/', auth, createOrder);
router.get('/', auth, getOrders);
router.get('/:id', auth, getOrderById);
router.get('/user/:id', auth, getOrdersByUserId);
router.put('/:id', adminAuth, updateOrder);
router.delete('/:id', adminAuth, deleteOrder);

export default router;
