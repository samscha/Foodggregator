const Yelp = require('../models/yelp');

const { APIs, status } = require('../../config');
const { urls, key } = APIs.yelp;
const { OK, USER_ERROR, SERVER_ERROR } = status;

const { fetchAPIWith } = require('./fetchControllers');

const cache = require('../cache');

const getYelps = (req, res, next) => {
  const { query } = req.query;
  const location = req.geocodeLoc;

  const { yelpUrl, yelpOptions } = getYelpBusinessesSearchUrl(query, location);

  if (cache[yelpUrl]) {
    req.yelps = cache[yelpUrl];
    next();
  }

  fetchAPIWith(yelpUrl, yelpOptions)
    .then(response => {
      req.yelps = response;
      next();
    })
    .catch(err => res.status(SERVER_ERROR).json(err));
};

const saveYelps = (req, res, next) => {
  Promise.all(
    req.yelps.businesses.map(place => {
      return new Promise((resolve, reject) => {
        Yelp.find({ id: place.id })
          .then(results => {
            results.length === 1
              ? resolve(results[0])
              : Yelp({
                  name: place.name,
                  address: `${place.location.display_address.join(', ')}, ${
                    place.location.country === 'US'
                      ? place.location.country + 'A'
                      : place.location.country
                  }`,
                  intlPhone: place.phone,
                  imgUri: place.image_url,
                  location: {
                    lat: place.coordinates.latitude,
                    lng: place.coordinates.longitude,
                  },
                  rating: place.rating,
                  id: place.id,
                })
                  .save()
                  .then(savedPlace => resolve(savedPlace))
                  .catch(err => reject(err));
          })
          .catch(err => reject(err));
      });
    }),
  )
    .then(values => {
      req.yelpsDb = values;
      next();
    })
    .catch(reason => res.status(SERVER_ERROR).json(reason));
};

const getYelpBusinessesSearchUrl = (query, location) => {
  return {
    yelpUrl: `${urls.search}?term=${query}&location=${location}`,
    yelpOptions: { headers: { Authorization: `Bearer ${key}` } },
  };
};

module.exports = { getYelps, saveYelps };
