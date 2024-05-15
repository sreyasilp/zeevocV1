import express from 'express';
const router = express.Router();
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/order.js';

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
