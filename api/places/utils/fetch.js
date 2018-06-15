/**
 * fetch controller
 */
const fetch = require('../fetch');

/**
 * utils
 */
const send = require('../../utils');

const { uris, output, key } = JSON.parse(process.env.GOOGLEPLACES);

exports.geocode = (req, res, next) => {
  const uri = `${uris.geocode}/${output}?key=${key}&address=${req.loc}`;

  fetch(uri, undefined, (err, json) => {
    if (err) {
      send(res, err, `error fetching geocode data`, 500);
      return;
    }

    req.geocode = { ...json };
    req.geometry = req.geocode.results[0].geometry.location;
    req.formattedAddress = req.geocode.results[0].formatted_address;

    next();
  });
};
