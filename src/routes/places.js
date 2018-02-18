const express = require('express');
const fetch = require('node-fetch');
const config = require('../../config.js');

const router = express.Router();

const status = config.status;
const gPlacesAPI = config.APIs.googlePlaces;
const yelpAPI = config.APIs.yelp;

const gPlacesTextSearchURL = `${gPlacesAPI.URL.textsearch}/${
  gPlacesAPI.output
}?key=${gPlacesAPI.key}`;

const yelpSearchURL = `${yelpAPI.URL.search}`;

const fetchAPI = URL => {
  return new Promise((resolve, reject) => {
    fetch(URL)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const fetchAPIWithOptions = (URL, options) => {
  return new Promise((resolve, reject) => {
    fetch(URL, options)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

router.post('/', (req, res) => {
  const { query, location } = req.body;

  const gPlacesURL = `${gPlacesTextSearchURL}&query=${query}+${location}`;

  const yelpURL = `${yelpSearchURL}?term=${query}&location=${location}`;
  const yelpOptions = {
    headers: { Authorization: `Bearer ${yelpAPI.key}` },
  };

  Promise.all([
    fetchAPI(gPlacesURL),
    fetchAPIWithOptions(yelpURL, yelpOptions),
  ]).then(values => {
    const gMapsData = values[0];
    const yelpData = values[1];
    console.log(yelpData);
    res.status(status.OK).send(yelpData);
  });
});

module.exports = router;
