/**
 * fetch controller
 */
const fetch = require('../../fetch');

const { uris, key } = JSON.parse(process.env.YELP);

/**
 * construct uri based on if query exists or not (query is optional)
 * set options for yelp api
 *
 * @param {Object} geometry - latitude (lat) and longitude (lng) of query
 * @param {string} query - query from user (optional)
 */
exports.search = (geometry, query) => {
  let uri = '';
  uri += `${uris.search}?`;
  if (query) uri += `term=${query}&`;
  uri += `latitude=${geometry.lat}&longitude=${geometry.lng}`;

  const options = { headers: { Authorization: `Bearer ${key}` } };

  return new Promise((resolve, reject) => {
    fetch(uri, options, (err, json) => {
      if (err) reject(err);

      resolve(json.businesses);
    });
  });
};
