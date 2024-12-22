const express = require('express');
const router = express.Router();

// Define a route for the root path
router.get('/category', (req, res) => {
    res.send(global.category); // Sends the global data object
});
router.get('/food', (req, res) => {
    res.send(global.data); // Sends the global data object
});

// Export the router for use in other files
module.exports = router;
