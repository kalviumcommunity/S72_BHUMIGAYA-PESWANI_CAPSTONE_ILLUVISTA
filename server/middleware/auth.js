const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'dev_secret_key';
    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.id };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}; 