const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbconfig');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
