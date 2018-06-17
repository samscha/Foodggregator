/**
 * cache
 */
const cache = require('../cache');

/**
 * utils
 */
const send = require('../../utils');

/**
 * if cached query exists, just send that
 *
 * stringify before checking
 */
exports.cache = (req, res, next) => {
  const cached = cache.read(JSON.stringify(req.query));

  if (cached) {
    send(res, cached);
    return;
  }

  next();
};
