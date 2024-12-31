const Video = require('../models/Video');

exports.uploadVideo = async (req, res) => {
  try {
    const { title, url, requiredPoints } = req.body;
    const video = await Video.create({
      title,
      url,
      userId: req.user.id,
      requiredPoints
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getVideosForViewing = async (req, res) => {
  try {
    const videos = await Video.getForViewing(req.user.id);
    res.json(videos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.recordView = async (req, res) => {
  try {
    const { videoId, watchTime } = req.body;
    const result = await Video.recordView(videoId, watchTime);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};