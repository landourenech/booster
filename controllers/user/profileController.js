const User = require('../../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.getById(req.user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updatePoints = async (req, res, next) => {
  try {
    const { points } = req.body;
    const user = await User.updatePoints(req.user.id, points);
    res.json(user);
  } catch (error) {
    next(error);
  }
};