/**
 * providers
 */
const googleplaces = require('../providers/googleplaces');

/**
 * utils
 */
const send = require('../../utils');

/**
 * combines places data from all providers
 * using JavaScript `Promise.all` (for parallel exec)
 *
 * @param {Object} geometry - latitude (lat) and longitude (lng) of query
 * @param {string} query - query from user (optional)
 */
module.exports = (req, res, next) => {
  Promise.all([
    googleplaces.search(req.geometry, req.q),
    // add more providers here
  ])
    .then(values => {
      // combine
      req.places = values;

      next();
    })
    .catch(reason => send(res, reason, `error combining providers`, 500));
};
