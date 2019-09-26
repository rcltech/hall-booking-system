const jwt = require('jsonwebtoken');
const to = require('await-to-js').default;
const handleError = require('../routes/errorHandler');
const key = process.env.API_KEY;

const authUser = async (req, res, next) => {
  // temporary jwt signature to verify payload
  const token = req.body.token;
  jwt.verify(token, key, (error, payload) => {
    if (error) return handleError(res, error, 'Failed to auth user', 401);
    req.body = payload;
  });
  next();
};

module.exports = authUser;
