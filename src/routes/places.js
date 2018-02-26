const express = require('express');
const config = require('../../config.js');
const cache = require('../cache');

const {
  fetchAPI,
  fetchAPIWith,
  createPlacesFrom,
} = require('../controllers/placesControllers');

const {
  getGoogleplacesTextsearchUrl,
  createGoogleplacePlacesFrom,
} = require('../controllers/googleplacesControllers');

const {
  getYelpBusinessesSearchUrl,
  createYelpPlacesFrom,
} = require('../controllers/yelpControllers');

const router = express.Router();

const { OK, USER_ERROR, SERVER_ERROR } = config.status;

router.get('/', (req, res) => {
  const { query, location } = req.query;

  const googleplacesUrl = getGoogleplacesTextsearchUrl(query, location);
  const { yelpUrl, yelpOptions } = getYelpBusinessesSearchUrl(query, location);

  Promise.all([
    cache[googleplacesUrl]
      ? Promise.resolve(cache[googleplacesUrl])
      : fetchAPI(googleplacesUrl),
    cache[yelpUrl]
      ? Promise.resolve(cache[yelpUrl])
      : fetchAPIWith(yelpUrl, yelpOptions),
  ])
    .then(values => {
      Promise.all([
        Promise.all(createGoogleplacePlacesFrom(values[0])),
        Promise.all(createYelpPlacesFrom(values[1])),
      ])
        .then(values => {
          res.json(values);
          return;

          // Promise.all(createPlacesFrom(values))
          //   .then(values => {
          //     console.log('results for route', values);
          //     res.status(OK).json(values);
          //   })
          //   .catch(err => res.status(SERVER_ERROR).json(err));
        })
        .catch(err => res.status(SERVER_ERROR).json(err));
    })
    .catch(err => res.status(SERVER_ERROR).json(err));
});

module.exports = router;
