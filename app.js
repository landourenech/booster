const express = require('express');
const cors = require('cors');
const rateLimiter = require('./middlewares/rateLimit');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Enable trust proxy to get correct IP addresses
app.set('trust proxy', 1);

// Middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;