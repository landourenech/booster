const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config/database');

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn
  });
};