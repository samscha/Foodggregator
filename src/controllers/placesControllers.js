const fetch = require('node-fetch');
const cache = require('../cache');

const fetchAPI = Url => {
  return new Promise((resolve, reject) => {
    fetch(Url)
      .then(res => res.json())
      .then(data => (cache[Url] = data))
      .then(_ => resolve(cache[Url]))
      .catch(err => reject(err));
  });
};

const fetchAPIWith = (Url, options) => {
  return new Promise((resolve, reject) => {
    fetch(Url, options)
      .then(res => res.json())
      .then(data => (cache[Url] = data))
      .then(_ => resolve(cache[Url]))
      .catch(err => reject(err));
  });
};

// const sterilize = (API, data, options = {}) => {
//   switch (data) {
//     case data.results: // googleplaces
//       // const { Url } = options;
//       return data.results
//       // return data.results.map(placeData => {
//       //   const { place_id } = placeData;
//       //   const placeDetailsUrl = `${Url}&placeid=${place_id}`;

//       //   fetchAPI(placeDetailsUrl)
//       //     .then(res => res.json())
//       //     .then(data => (cache[placeDetailsUrl] = data))
//       //     .then(_ => {
//       //       return Object.assign(placeData, cache[placeDetailsUrl].result);
//       //     })
//       //     .catch(err => console.log(err));
//       // });
//       case data.businesses: // yelp
//         return data.businesses
//   }
// };

module.exports = { fetchAPI, fetchAPIWith };
