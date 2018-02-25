const Yelp = require('../models/yelp');

const { APIs } = require('../../config.js');
const { urls, key } = APIs.yelp;

const getYelpBusinessesSearchUrl = (query, location) => {
  return {
    yelpUrl: `${urls.search}?term=${query}&location=${location}`,
    yelpOptions: { headers: { Authorization: `Bearer ${key}` } },
  };
};

const createYelpPlacesFrom = data => {
  return data.businesses.map(place => {
    return new Promise((resolve, reject) => {
      Yelp({
        name: place.name,
        address: `${place.location.display_address.join(', ')}, ${
          place.location.country === 'US'
            ? place.location.country + 'A'
            : place.location.country
        }`,
        intlPhone: place.phone,
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
    });
  });
};

module.exports = { getYelpBusinessesSearchUrl, createYelpPlacesFrom };