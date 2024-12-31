const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { register } = require('../controllers/user/registerController');
const { getProfile, updatePoints } = require('../controllers/user/profileController');

router.post('/register', register);
router.get('/profile', protect, getProfile);
router.put('/points', protect, updatePoints);

module.exports = router;