// UserController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/User'); 
// Ensure jwt is imported

// Create user function
exports.createUser = async (req, res) => {
    
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ name, email, password });
        await user.save();
        
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error); 
        res.status(500).json({ message: 'Server error', error: error.message }); 
    }
};


exports.loginUser = async (req, res) => {
    console.log("Password received:", req.body.password);
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("No user found with that email.");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("Stored hashed password:", user.password);
        console.log("Provided password:", password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // JWT token generation
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3days' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



exports.testPassword =async ()=> {
    const password = "securepassword";
    const hashedPassword = await bcrypt.hash(password, 10); // Hash with 10 salt rounds

    console.log("Hashed password:", hashedPassword);

    // Check if bcrypt can compare correctly
    const isMatch = await bcrypt.compare(password, hashedPassword);
    console.log("Password comparison result:", isMatch); // Should be true

    if (!isMatch) {
        console.error("Password hashing or comparison is malfunctioning.");
    }
};


