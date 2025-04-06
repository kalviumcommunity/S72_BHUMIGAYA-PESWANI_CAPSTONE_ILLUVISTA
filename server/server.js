// app.js
const express = require('express');
const connectDB = require('./config/dbconfig');
const dotenv = require('dotenv');


// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json



// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
