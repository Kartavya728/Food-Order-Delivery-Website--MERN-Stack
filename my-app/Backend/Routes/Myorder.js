const express = require('express');
const Orders = require('../models/Orders'); // Ensure the correct path to your Orders model
const router = express.Router();

// Define a route for the POST request to /myorders
router.post('/myorders', async (req, res) => {
  const { name } = req.body;

  // Validate the input
  if (!name) {
    return res.status(400).json({ message: 'Invalid request: Name is required.' });
  }

  try {
    // Find the order by name
    const userOrders = await Orders.findOne({ name: name });

    if (!userOrders) {
      // If no orders found, send an appropriate response
      return res.status(400).json(error);
    }

    // Send the orders to the frontend
    res.status(200).send(userOrders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ 
      message: 'Internal Server Error', 
      error: error.message 
    });
  }
});

module.exports = router;

