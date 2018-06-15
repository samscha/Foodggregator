/**
 * cache
 */
const cache = require('..');

/**
 * utils
 */
const send = require('../../utils');

/**
 * if cached query exists, just send that
 */
exports.cache = (req, res, next) => {
  const cached = cache[req.query];

  if (cached) {
    send(res, cached);
    return;
  }

  next();
};
