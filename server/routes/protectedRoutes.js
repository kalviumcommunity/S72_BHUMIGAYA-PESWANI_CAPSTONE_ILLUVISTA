const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// GET /api/protected/ping - requires valid JWT
router.get('/ping', auth, (req, res) => {
  res.json({ message: 'pong', userId: req.user.id });
});

module.exports = router; 