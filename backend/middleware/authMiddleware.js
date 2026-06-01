// Protects routes — if no valid JWT, request is rejected
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // JWT is sent in the Authorization header as: "Bearer <token>"
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify the token is valid and not expired
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request object (minus their password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // All good — proceed to the route handler
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };