

const bcrypt = require('bcrypt');
const User = require('../models/user');

const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });
  
      // Save to the database
      await newUser.save();
  
      const userWithoutPassword = newUser.toObject();
      delete userWithoutPassword.password;
  
      res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };




const getUsers = async (req, res) => {
    try {
      const users = await User.find({}, '-password'); // exclude password field
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  




// Get a single user by ID (excluding password)
const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findById(userId).select('-password'); // exclude password
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  
  module.exports = {
    signup,
    getUsers,
    getUserById
  };
  

