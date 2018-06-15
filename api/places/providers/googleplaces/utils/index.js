const fetch = require('../../../fetch');

const { uris, output, key, fields } = JSON.parse(process.env.GOOGLEPLACES);

/**
 * fetch google places detail
 *
 * use `Promise.all` ƒor parallel exec of each google place details fetch
 *
 * check for both err (`node-fetch` catch) and json.error (google api response)
 *
 * returns an Array of updated google place objects with phone numbers added
 *
 * @param {Array} places - a list of google places api place objects
 */
exports.details = places => {
  return Promise.all(
    places.map(place => {
      return new Promise((resolve, reject) => {
        fetch(detailsUriCreator(place.place_id), undefined, (err, json) => {
          if (err) reject(err);
          if (json.error_message) reject(json.error_message);

          resolve({
            ...place,
            international_phone_number: json.result.international_phone_number,
          });
        });
      });
    }),
  );
};

/**
 * in fetch uri, only get fields from details search
 * specified in .env (to reduce api call count)
 * https://developers.google.com/places/web-service/details
 *
 * @param {string} placeId - google place place id
 */
const detailsUriCreator = placeId => {
  return `${
    uris.details
  }/${output}?key=${key}&placeid=${placeId}&fields=${fields}`;
};
