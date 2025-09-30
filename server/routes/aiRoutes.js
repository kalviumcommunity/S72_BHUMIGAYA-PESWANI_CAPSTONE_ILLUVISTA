const express = require('express');
const router = express.Router();
const { suggestCompletion } = require('../controllers/aiController');

router.post('/suggest', suggestCompletion);

module.exports = router; 