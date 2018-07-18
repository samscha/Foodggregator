const send = require('../../utils');

exports.search = (req, res, next) => {
  if (!req.query.location) {
    send(res, undefined, `Please provide a location`, 422);
    return;
  }

  next();
};
