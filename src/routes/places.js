const express = require('express');
const router = express.Router();

const { sendPlaces } = require('../controllers/placesControllers');

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
  sendPlaces,
);

module.exports = router;
