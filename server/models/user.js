const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  profileImage: {
    type: String,
    default: ''   
  },
  name: {
    type: String,
    required: true
  },
    email: {
        type: String,
        required: true,
        unique: true
    },
  password: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    enum: ['artist', 'visitor'],
    default: ['visitor']
  },
  bio: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
