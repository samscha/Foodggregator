const router = require('express').Router();

// const { sendPlaces } = require('../controllers/placesControllers');

// const {
//   getGoogleplaceGeocode,
//   getGoogleplaces,
//   getGoogleplacesDetail,
//   saveGoogleplaces,
// } = require('../controllers/googleplacesControllers');

// const { getYelps, saveYelps } = require('../controllers/yelpControllers');

// router.get(
//   '/',
//   getGoogleplaceGeocode,
//   getGoogleplaces,
//   getGoogleplacesDetail,
//   saveGoogleplaces,
//   getYelps,
//   saveYelps,
//   sendPlaces,
// );

/**
 * /api/places
 *
 * routes for places
 */

router.use('/', require('./routes/root'));

module.exports = router;
