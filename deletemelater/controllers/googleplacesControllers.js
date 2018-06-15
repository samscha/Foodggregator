const Googleplace = require('../models/googleplace');

const { APIs, status } = require('../../config.js');
const { urls, output, key } = APIs.googleplaces;
const { OK, USER_ERROR, SERVER_ERROR } = status;

const { fetchAPI } = require('./fetchControllers');

const cache = require('../cache');

const getGoogleplaceGeocode = (req, res, next) => {
  fetchAPI(`${urls.geocode}/${output}?key=${key}&address=${location}`)
    .then(response => {
      req.geocode = response.results[0];
      req.geocodeLoc = response.results[0].formatted_address;
      next();
    })
    .catch(err => res.status(SERVER_ERROR).json(err));
};

const getGoogleplaces = (req, res, next) => {
  const { query } = req.query;
  const location = req.geocodeLoc;

  const textsearchUri = getGoogleplacesTextsearchUrl(query, location);

  if (cache[textsearchUri]) {
    req.googleTextsearch = cache[textsearchUri];
    next();
    return;
  }

  fetchAPI(textsearchUri)
    .then(response => {
      req.googleTextsearch = response;
      next();
    })
    .catch(err => res.status(SERVER_ERROR).json(err));
};

const getGoogleplacesDetail = (req, res, next) => {
  Promise.all(
    req.googleTextsearch.results.map(place => {
      return new Promise((resolve, reject) => {
        fetchAPI(getGooglePlacesDetailsUrl(place.place_id))
          .then(details => resolve(details))
          .catch(err => reject(err));
      });
    }),
  )
    .then(values => {
      req.googleDetailsSearch = values;
      next();
    })
    .catch(reason => res.status(SERVER_ERROR).json(reason));
};

const combineGoogleplaces = (req, res, next) => {
  const googleplaces = req.googleTextsearch.results;
  const googleplacesDetail = req.googleDetailsSearch.map(place => place.result);

  req.places = googleplaces.map((place, i) => {
    return { ...place, details: googleplacesDetail[i] };
  });
  next();
};

const saveGoogleplaces = (req, res, next) => {
  const googleplaces = req.googleTextsearch.results;
  const googleplacesDetail = req.googleDetailsSearch.map(place => place.result);

  Promise.all(
    googleplaces.map((place, i) => {
      return new Promise((resolve, reject) => {
        Googleplace.find({ id: place.id })
          .then(results => {
            results.length === 1
              ? resolve(results[0])
              : Googleplace({
                  name: place.name,
                  address: place.formatted_address,
                  intlPhone: googleplacesDetail[i].international_phone_number
                    ? googleplacesDetail[i].international_phone_number.replace(
                        /[ -]/g,
                        '',
                      )
                    : '',
                  location: {
                    lat: place.geometry.location.lat,
                    lng: place.geometry.location.lng,
                  },
                  rating: place.rating,
                  id: place.id,
                  placeId: place.place_id,
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
      req.googleplacesDb = values;
      next();
    })
    .catch(reason => res.status(SERVER_ERROR).json(reason));
};

const getGoogleplacesTextsearchUrl = (query, location) => {
  return `${urls.textsearch}/${output}?key=${key}&query=${query} ${location}`;
};

const getGooglePlacesDetailsUrl = placeId => {
  return `${urls.details}/${output}?key=${key}&placeid=${placeId}`;
};

module.exports = {
  getGoogleplaceGeocode,
  getGoogleplaces,
  getGoogleplacesDetail,
  combineGoogleplaces,
  saveGoogleplaces,
};
