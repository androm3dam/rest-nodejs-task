const jwt = require('jsonwebtoken');
const { jwtKey } = require('../../config');
const Token = require('../models/Token');

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    const notDeleted = await Token.findById(token);
    if (!notDeleted) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    const decoded = jwt.verify(token, jwtKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Нет авторизации' });
  }
};
