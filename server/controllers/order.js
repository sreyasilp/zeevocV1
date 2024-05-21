import Order from '../models/order.js';
import user from '../models/user.js';

// Create a new order
export const createOrder = async (req, res) => {
  const { user, orderItems, paymentMethod, itemsPrice, taxPrice, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  const order = new Order({
    user,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice, 
  });

  try {
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Creating order failed', error });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'firstName lastName email').populate('orderItems.product', 'title category');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Fetching orders failed', error });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate('user', 'firstName lastName email').populate('orderItems.product', 'title category');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Fetching order failed', error });
  }
};

// Update an order
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true }).populate('user', 'firstName lastName email').populate('orderItems.product', 'title category');
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Updating order failed', error });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndRemove(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Deleting order failed', error });
  }
};

export const getOrdersByUserId = async (req, res) => {
  const { id } = req.params; // Extract user ID from req.params.id

  try {
    const orders = await Order.find({ user: id })
      .populate('orderItems.product', 'title category')
      .populate('user', 'firstName lastName email');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Fetching user orders failed', error });
  }
};