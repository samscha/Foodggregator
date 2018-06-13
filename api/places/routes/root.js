const router = require('express').Router();

const dev = process.env.DEV === 'true';

/**
 * development test route only
 */
if (dev) {
  router.route(`/dev`).get((req, res) => {
    res.send({ places_root: `running` });
  });
}

module.exports = router;
