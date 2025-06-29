const rateLimit = require('express-rate-limit');

// Login rate limiter - tracks by both IP and email
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    keyGenerator: (req) => {
        // Use email if available, otherwise fall back to IP
        return req.body.email || req.ip;
    },
    skipSuccessfulRequests: true, // Reset counter on successful login
    skipFailedRequests: false, // Count failed attempts
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many login attempts',
            message: 'Please try again in 15 minutes',
            retryAfter: Math.ceil(15 * 60 / 1000) // seconds
        });
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Register rate limiter
const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 attempts per hour
    keyGenerator: (req) => req.body.email || req.ip,
    skipSuccessfulRequests: true,
    message: 'Too many registration attempts, try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

// General API rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { loginLimiter, registerLimiter, apiLimiter }; 