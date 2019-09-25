const authUser = (req, res, next) => {
  console.log('In authUser middleware');
  console.log(req.body);
  next();
};

module.exports = authUser;
