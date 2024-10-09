require('dotenv').config();
const express = require('express');
const connectDB = require('./db'); // Import the DB connection
const apiRoutes = require('./routes/api'); // Import your routes

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Use the API routes
app.use('/api', apiRoutes); // Ensure this matches your route setup

app.get('/', (req, res) => {
    res.send('it is working');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
