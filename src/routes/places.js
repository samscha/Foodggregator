const express = require('express');
const fetch = require('node-fetch');
const config = require('../../config.js');
const cache = require('../cache');

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
      .then(data => (cache[URL] = data))
      .then(_ => resolve(cache[URL]))
      .catch(err => reject(err));
  });
};

const combine = data => {
  // list = [ { restaurant_name: [ {Google Places data}, {Yelp data} ] }]
  // list = [        key       :                 value                . ]
  // const list = [];
  const list = {};

  data.forEach(dataAPI => {
    dataAPI.forEach(restaurantAPI => {
      list[restaurantAPI.name]
        ? (list[restaurantAPI.name] = list[restaurantAPI.name].concat(
            restaurantAPI,
          ))
        : (list[restaurantAPI.name] = [].concat(restaurantAPI));

      // if (list.filter(restaurantList => restaurantList.name !== restaurantAPI.name)
      //   .length > 0) {
      //     const restaurants = Object.values(list.filter(
      //       restaurantList => restaurantList.name !== restaurantAPI.name,
      //     )[0]).push(restaurantAPI)

      //   }

      //   ? list[
      //       list.indexOf(
      //         list.filter(
      //           restaurantList => restaurantList.name !== restaurantAPI.name,
      //         )[0],
      //       )
      //     ].push(restaurantAPI)
      //   : list.push({ [restaurantAPI.name]: [restaurantAPI] });
    });
    // list.filter(restaurant => restaurant.name !== dataAPI.name).length > 0
    //   ? list[
    //       list.indexOf(
    //         list.filter(restaurant => restaurant.name !== dataAPI.name),
    //       )
    //     ].push(dataAPI)
    //   : list.push({ [dataAPI.name]: [dataAPI] });
    // list.push({ [dataAPI.name]: [dataAPI] });
  });

  return list;
};

router.post('/', (req, res) => {
  const { query, location } = req.body;

  const gPlacesURL = `${gPlacesTextSearchURL}&query=${query}+${location}`;

  const yelpURL = `${yelpSearchURL}?term=${query}&location=${location}`;
  const yelpOptions = {
    headers: { Authorization: `Bearer ${yelpAPI.key}` },
  };

  Promise.all([
    cache[gPlacesURL]
      ? Promise.resolve(cache[gPlacesURL])
      : fetchAPI(gPlacesURL),
    cache[yelpURL]
      ? Promise.resolve(cache[yelpURL])
      : fetchAPIWithOptions(yelpURL, yelpOptions),
  ]).then(values => {
    const gMapsData = values[0].results;
    const yelpData = values[1].businesses;

    const combinedData = combine([gMapsData, yelpData]);
    console.log(combinedData);

    // console.log(yelpData);
    res.status(status.OK).send(combinedData);
  });
});

module.exports = router;
