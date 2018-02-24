const fetch = require('node-fetch');
const cache = require('../cache');

const fetchAPI = URL => {
  return new Promise((resolve, reject) => {
    fetch(URL)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const fetchAPIWith = (URL, options) => {
  return new Promise((resolve, reject) => {
    fetch(URL, options)
      .then(res => res.json())
      .then(data => (cache[URL] = data))
      .then(_ => resolve(cache[URL]))
      .catch(err => reject(err));
  });
};

const sterilize = (API, data, options = {}) => {
  switch (API) {
    case 'GooglePlaces':
      const { URL } = options;
      return data.results.map(placeData => {
        const { place_id } = placeData;
        const placeDetailsURL = `${URL}&placeid=${place_id}`;

        fetchAPI(placeDetailsURL)
          .then(res => res.json())
          .then(data => (cache[placeDetailsURL] = data))
          .then(_ => {
            return Object.assign(placeData, cache[placeDetailsURL].result);
          })
          .catch(err => console.log(err));
      });
  }
};

module.exports = { fetchAPI, fetchAPIWith, sterilize };
