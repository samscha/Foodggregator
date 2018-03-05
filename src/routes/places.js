const express = require('express');
const router = express.Router();

const config = require('../../config.js');
const cache = require('../cache');

const { OK, USER_ERROR, SERVER_ERROR } = config.status;

const { fetchAPI, fetchAPIWith } = require('../controllers/fetchControllers');

const {
  comebineThese,
  createPlacesFrom,
  findPlacesWith,
} = require('../controllers/placesControllers');

const {
  getGoogleplaceGeocode,
  getGoogleplaces,
  getGoogleplacesDetail,
  saveGoogleplaces,
} = require('../controllers/googleplacesControllers');

const { getYelps, saveYelps } = require('../controllers/yelpControllers');

router.get(
  '/',
  getGoogleplaceGeocode,
  getGoogleplaces,
  getGoogleplacesDetail,
  saveGoogleplaces,
  getYelps,
  saveYelps,
  (req, res) => {
    const { googleplacesDb, yelpsDb } = req;

    const combinedPlaces = comebineThese([googleplacesDb, yelpsDb]);

    Promise.all(createPlacesFrom(combinedPlaces))
      .then(values => {
        findPlacesWith(values)
          .then(places => res.status(OK).json([req.geocode].concat(places)))
          .catch(err => res.status(SERVER_ERROR).json(err));
      })
      .catch(reason => res.status(SERVER_ERROR).json(reason));

    //   const geocode = req.geocode;
    //   const location = req.geocodeLoc;
    //   const { query } = req.query;
    //   const googleplacesUrl = getGoogleplacesTextsearchUrl(query, location);
    //   const { yelpUrl, yelpOptions } = getYelpBusinessesSearchUrl(
    //     query,
    //     location,
    //   );
    //   Promise.all([
    //     cache[googleplacesUrl]
    //       ? Promise.resolve(cache[googleplacesUrl])
    //       : fetchAPI(googleplacesUrl),
    //     cache[yelpUrl]
    //       ? Promise.resolve(cache[yelpUrl])
    //       : fetchAPIWith(yelpUrl, yelpOptions),
    //   ])
    //     .then(values => {
    //       Promise.all([
    //         Promise.all(createGoogleplacePlacesFrom(values[0])),
    //         Promise.all(createYelpPlacesFrom(values[1])),
    //       ])
    //         .then(values => {
    //           const combinedPlaces = comebineThese(values);
    //           Promise.all(createPlacesFrom(combinedPlaces))
    //             .then(values => {
    //               // findPlacesWith(values[0].concat(values[1]))
    //               // console.log(values);
    //               // value =>
    //               findPlacesWith(values)
    //                 .then(places => res.status(OK).json([geocode].concat(places)))
    //                 .catch(err => res.status(SERVER_ERROR).json(err));
    //             })
    //             .catch(err => res.status(SERVER_ERROR).json(err));
    //           // console.log('results for route', values);
    //           // res.status(OK).json(findPlacesWith(values[0].concat(values[1])));
    //         })
    //         .catch(err => res.status(SERVER_ERROR).json(err));
    //     })
    //     .catch(err => res.status(SERVER_ERROR).json(err));
    //   // })
    //   // .catch(err => res.status(SERVER_ERROR).json(err));
  },
);

module.exports = router;
