const express = require('express');
const Orders = require('../models/Orders');
const router = express.Router();

// Define a route for the POST request to /orders
router.post('/orders', async (req, res) => {
  console.log("Request Body:", req.body);

  const { name, orders } = req.body;

  // Validate the incoming data
  if (!name || !Array.isArray(orders) || orders.length === 0) {
    return res.status(400).json({ message: 'Invalid request: Name and orders are required.' });
  }

  try {
    // Check if an order record already exists for the given user
    let existingOrder = await Orders.findOne({ name: name });

    if (existingOrder) {
      // If the user exists, append the new orders to the existing orders
      existingOrder.orders = [...existingOrder.orders, ...orders];
      await existingOrder.save();

      res.status(200).json({
        message: 'Orders updated successfully!',
        data: existingOrder,
      });
    } else {
      // If the user doesn't exist, create a new order record
      const newOrder = await Orders.create({
        name: name,
        orders: orders,
      });

      res.status(201).json({
        message: 'New order created successfully!',
        data: newOrder,
      });
    }
  } catch (error) {
    // Log the error for debugging
    console.error('Error processing order:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});



module.exports = router;
