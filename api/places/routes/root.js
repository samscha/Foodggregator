const router = require('express').Router();

/**
 * checker
 */
const check = require('../utils/check');

/**
 * fetch util
 */
const fetch = require('../utils/fetch');

/**
 * combiner
 */
const combine = require('../utils/combine');

/**
 * utils
 */
const sanitize = require('../../utils/sanitize');
const send = require('../../utils');
const validate = require('../../utils/validate');

const dev = process.env.DEV === 'true';

router
  .route(`/`)

  /**
   * fetch places
   *
   * req.query.location is required,
   * req.query.query is optional
   *
   * req.geocode is used to normalize location for all providers:
   * - req.geometry: lat/lng
   * - req.formattedAddress: formatted address
   */
  .get(
    validate.search,
    sanitize.search,
    check.cache,
    fetch.geocode,
    combine.places,
    (req, res) => send(res, req.places),
  );

/**
 * development test route only
 */
if (dev) {
  router.route(`/dev`).get((req, res) => {
    res.send({ places_root: `running` });
  });
}
module.exports = router;
