const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbconfig');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const logger= require('./logger');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow cross-origin requests (important for frontend)

// Connect to DB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/users', userRoutes);

// Add the GET method
app.get('/he', (req, res) => {
  res.send('he');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
