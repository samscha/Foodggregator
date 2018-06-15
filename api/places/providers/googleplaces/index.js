const send = require('../../../utils');
const fetch = require('../../fetch');
const { details } = require('./utils');
const cache = require('../../cache');

const { uris, output, key } = JSON.parse(process.env.GOOGLEPLACES);

/**
 * first check if cached entry exists for location
 * if so, use cached, else write to cache after fetch (if no errors)
 *
 *  https://developers.google.com/maps/documentation/geocoding/start
 *
 * req.geometry =
 * {
 *    lat: 0.00,
 *    lng: 0.00
 * }
 *
 * req.formattedAddress = `123 Example St, Exampleville, EX, 12345.`
 */
exports.geocode = (req, res, next) => {
  const cached = cache.read(req.query.location);

  if (cached) {
    req.geocode = { ...cached };
    req.geometry = req.geocode.results[0].geometry.location;
    req.formattedAddress = req.geocode.results[0].formatted_address;

    next();
    return;
  }

  const uri = `${uris.geocode}/${output}?key=${key}&address=${req.loc}`;

  fetch(uri, undefined, (err, json) => {
    if (err) {
      send(res, err, `error fetching geocode data`, 500);
      return;
    }

    cache.write(req.query.location, { ...json });

    req.geocode = { ...json };
    req.geometry = req.geocode.results[0].geometry.location;
    req.formattedAddress = req.geocode.results[0].formatted_address;

    next();
  });
};

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
exports.search = (geometry, query) => {
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

exports.detail = (req, res, next) => {
  //
};
