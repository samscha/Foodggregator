const router = require('express').Router();

/**
 * /api/places
 *
 * routes for places
 */
router.use('/', require('./routes/root'));

module.exports = router;
