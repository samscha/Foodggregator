const dev = process.env.DEV === 'true';

const router = require('express').Router();

/**
 * api endpoints
 */
router.use('/places', require('./places'));
// router.use('/pictures', require('./api/endpoints/picture'));
// add more api endpoints here

/**
 * development test route only
 */
if (dev) {
  router.route(`/dev`).get((req, res) => {
    res.send({ api: 'running' });
  });
}

module.exports = router;
