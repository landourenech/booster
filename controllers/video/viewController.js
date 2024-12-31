const Video = require('../../models/Video');

exports.getVideosForViewing = async (req, res, next) => {
  try {
    const videos = await Video.getForViewing(req.user.id);
    res.json(videos);
  } catch (error) {
    next(error);
  }
};

exports.recordView = async (req, res, next) => {
  try {
    const { videoId, watchTime } = req.body;
    const result = await Video.recordView(videoId, watchTime);
    res.json(result);
  } catch (error) {
    next(error);
  }
};