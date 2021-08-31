const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token, except the "Bearer"
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Request get user, except user password
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).send({ message: 'Not authorized, invalid token.' });
    }
  }

  if (!token) {
    res.status(401).send({ message: 'Not authorized, invalid token.' });
  }
};

module.exports = { protect };
