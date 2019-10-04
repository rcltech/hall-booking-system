const jwt = require('jsonwebtoken');
const handleError = require('../routes/errorHandler');
const key = process.env.API_KEY;

const authUser = (req, res, next) => {
  let token = req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  } else {
    const error = 'No token provided';
    return handleError(res, error, error, 401);
  }

  jwt.verify(token, key, (error, payload) => {
    if (error) return handleError(res, error, 'Failed to auth user', 401);
    next();
  });
};

module.exports = authUser;
