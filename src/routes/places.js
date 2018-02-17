const express = require('express');
const fetch = require('node-fetch');
const config = require('../../config.js');

const router = express.Router();

const status = config.status;
const gMapKey = config.gMap.key;

router.post('/', (req, res) => {
  const { query, location } = req.body;
  console.log(query);
  console.log(location);
});

module.exports = router;
