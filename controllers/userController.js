const User = require('../models/User');
const { generateToken } = require('../utils/tokenHandler');

exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await User.create({ email, password, username });
    const token = generateToken(user.id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.getById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePoints = async (req, res) => {
  try {
    const { points } = req.body;
    const user = await User.updatePoints(req.user.id, points);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};