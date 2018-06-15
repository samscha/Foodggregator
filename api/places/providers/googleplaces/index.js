/**
 * fetch controller
 */
const fetch = require('../../fetch');

/**
 * google place utils
 */
const { details } = require('./utils');


const { uris, output, key } = JSON.parse(process.env.GOOGLEPLACES);

/**
 * https://developers.google.com/places/web-service/search
 *
 * set search radius to 50m in fetch `uri`
 *
 * check for both err (`node-fetch` catch) and json.error (google api response)
 *
 * because combine in /places/utils is a `Promise.all` (for parallel exec),
 * this function will return a `Promise`
 *
 * `details` is a `Promise.all`, so just write the .exec code in this function
 * and resolve or reject the result of `details`
 *
 * @param {Object} geometry - latitude (lat) and longitude (lng) of query
 * @param {string} query - query from user (optional)
 */
exports.search = (geometry, query = 'food') => {
  const uri = `${uris.nearbysearch}/${output}?key=${key}&location=${
    geometry.lat
  },${geometry.lng}&radius=50&type=restaurant&keyword=${query}`;

  return new Promise((resolve, reject) => {
    fetch(uri, undefined, (err, json) => {
      if (err) reject(err);
      if (json.error_message) reject(json.error_message);

      details(json.results)
        .then(values => resolve(values))
        .catch(reason => reject(reason));
    });
  });
};
