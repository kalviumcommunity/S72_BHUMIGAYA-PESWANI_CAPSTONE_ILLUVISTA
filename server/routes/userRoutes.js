const express = require('express');
const router = express.Router();
const { signup, getUsers, getUserById ,updateUser} = require('../controllers/userController');

router.post('/signup', signup);             // POST /api/signup
router.get('/users', getUsers);             // GET  /api/users
router.get('/users/:id', getUserById);    
router.put('/users/:id', updateUser); 


module.exports = router;
