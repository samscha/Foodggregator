exports.search = (req, res, next) => {
  req.q = req.query.query;
  req.loc = req.query.location;

  next();
};
