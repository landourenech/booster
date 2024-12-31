const User = require('../../models/User');
const { generateToken } = require('../../utils/tokenHandler');

exports.register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = await User.create({ email, password, username });
    const token = generateToken(user.id);
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};