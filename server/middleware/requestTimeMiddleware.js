const requestTime = (req, res, next) => {
  req.requestTime = new Date().toLocaleString();
  next();
};

module.exports = requestTime;
