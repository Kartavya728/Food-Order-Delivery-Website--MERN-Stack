const express = require("express");
const router = express.Router();
const {login} = require("../Controllers/user")

// POST route to verify user credentials
router.post('/', login);

module.exports = router;

