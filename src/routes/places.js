const express = require('express');
const config = require('../../config.js');
const cache = require('../cache');

const { OK, USER_ERROR, SERVER_ERROR } = config.status;

const {
  fetchAPI,
  fetchAPIWith,
  comebineThese,
  createPlacesFrom,
  findPlacesWith,
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
          const combinedPlaces = comebineThese(values);

          // res.json(values.reduce((s, e) => s.concat(e)));
          // return; // res.json(values);
          // return;

          // const results = comebineThese(values);

          // console.log('combined', comebineThese(values));
          // res.json(comebineThese(values));
          // return;

          // createPlacesFrom(values);

          Promise.all(createPlacesFrom(combinedPlaces))
            .then(values => {
              // findPlacesWith(values[0].concat(values[1]))
              // console.log(values);
              // value =>
              findPlacesWith(values)
                .then(value => res.status(OK).json(value))
                .catch(err => res.status(SERVER_ERROR).json(err));
            })
            .catch(err => res.status(SERVER_ERROR).json(err));
          // console.log('results for route', values);
          // res.status(OK).json(findPlacesWith(values[0].concat(values[1])));
        })
        .catch(err => res.status(SERVER_ERROR).json(err));
    })
    .catch(err => res.status(SERVER_ERROR).json(err));
  // })
  // .catch(err => res.status(SERVER_ERROR).json(err));
});

module.exports = router;
