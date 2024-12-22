const { body, validationResult } = require('express-validator'); // Import express-validator
const User = require("../models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const secret="MyNameIsKartavyaSuryawanshi";

// Validation rules middleware
const validateUserInput = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required'),
    body('email')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Function to handle user input
async function userInput(req, res) {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Send validation errors
    }

    const body= req.body; // Extract data from request body

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)

    try {
        // Create a new user in the database
        const newUser = await User.create({
            name: body.name,
            location: body.location,
            email: body.email,
            password: secPassword,
        });

        console.log("User created successfully!");

        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: newUser._id,
                name: newUser.name,
                location: newUser.location,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
}

async function login(req,res) {
        const { name, password } = req.body; // Destructure 'name' and 'password'
      
        try {
          // Search for a user with the given name
          const user = await User.findOne({ name: name });
      
          if (!user) {
            return res.status(404).json({ error: "Invalid user name" });
          }
          const pwdCompare = await bcrypt.compare(req.body.password,user.password)
          // Compare passwords directly
          if (!pwdCompare) {
            return res.status(401).json({ error: "Invalid password" });
          }
          const authToken=jwt.sign({user:{id:user.id}},secret)
          // Success response
          res.json({ success: true, authToken:authToken});
        } catch (error) {
          console.error("Error during authentication:", error.message);
          res.status(500).json({ error: "Server error" });
        }
}

module.exports = {
    validateUserInput, 
    login,
    userInput      
};
