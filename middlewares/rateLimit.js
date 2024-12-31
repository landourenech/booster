const rateLimit = require('express-rate-limit');
const { rateLimiter } = require('../config/server');

const limiter = rateLimit({
  ...rateLimiter,
  // Add custom key generator to handle missing IP addresses
  keyGenerator: (req) => {
    return req.ip || req.headers['x-forwarded-for'] || 'unknown';
  },
  // Add standardized error handler
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      message: 'Too many requests, please try again later.'
    });
  },
  // Skip failed requests
  skipFailedRequests: true,
  // Enable trusted proxy
  trustProxy: true
});

module.exports = limiter;