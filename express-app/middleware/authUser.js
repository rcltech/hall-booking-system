const jwt = require('jsonwebtoken');
const to = require('await-to-js').default;
const handleError = require('../routes/errorHandler');
const key = process.env.API_KEY;
const dummyUserId = process.env.DUMMY_USER_ID;

const authUser = async (req, res, next) => {
  // temporary jwt signature to verify payload
  const token = req.body.token;
  jwt.verify(token, key, (error, payload) => {
    if (error || dummyUserId !== payload.userId)
      return handleError(
        res,
        error ? error : 'Invalid user',
        'Failed to auth user',
        401
      );
    req.body = payload;
  });
  next();
};

module.exports = authUser;
