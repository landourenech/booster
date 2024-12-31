const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { uploadVideo } = require('../controllers/video/uploadController');
const { getVideosForViewing, recordView } = require('../controllers/video/viewController');

router.post('/', protect, uploadVideo);
router.get('/feed', protect, getVideosForViewing);
router.post('/view', protect, recordView);

module.exports = router;