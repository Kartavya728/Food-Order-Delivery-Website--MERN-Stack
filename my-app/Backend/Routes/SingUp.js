const express = require('express');
const router = express.Router();
const { validateUserInput, userInput } = require("../Controllers/user");

// Route with validation middleware and controller
router.post('/', validateUserInput, userInput);

module.exports = router;
