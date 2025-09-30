const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST /api/token/refresh - stub that issues a new token based on an existing token (no real refresh store)
router.post('/refresh', (req, res) => {
  const { token } = req.body || {};
  if (!token) return res.status(400).json({ error: 'token is required' });

  try {
    const secret = process.env.JWT_SECRET || 'dev_secret_key';
    const decoded = jwt.verify(token, secret);
    const newToken = jwt.sign({ id: decoded.id }, secret, { expiresIn: '7d' });
    return res.json({ token: newToken });
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
});

module.exports = router; 