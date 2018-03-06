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
  },
);

module.exports = router;
