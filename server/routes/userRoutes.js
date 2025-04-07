const express = require('express');
const router = express.Router();
const { signup, getUsers, getUserById } = require('../controllers/userController');

router.post('/signup', signup);             // POST /api/signup
router.get('/users', getUsers);             // GET  /api/users
router.get('/users/:id', getUserById);    

module.exports = router;
