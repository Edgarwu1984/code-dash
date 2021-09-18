const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  // 500 requests from a same IP in 1 hour
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try later again.',
});

module.exports = limiter;
