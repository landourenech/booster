const Video = require('../../models/Video');

exports.uploadVideo = async (req, res, next) => {
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
    next(error);
  }
};