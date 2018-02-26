const Place = require('../models/place');

const fetch = require('node-fetch');
const cache = require('../cache');

const { APIsIndex } = require('../../config');

const fetchAPI = url => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => (cache[url] = data))
      .then(_ => resolve(cache[url]))
      .catch(err => reject(err));
  });
};

const fetchAPIWith = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(res => res.json())
      .then(data => (cache[url] = data))
      .then(_ => resolve(cache[url]))
      .catch(err => reject(err));
  });
};

const createPlacesFrom = data => {
  return data.map((API, i) => Promise.all(createPlacesFor(API, APIsIndex[i])));
};

const createPlacesFor = (data, APiName) => {
  console.log('apiname', APiName);
  return data.map(placeArr => {
    const place = placeArr[0];
    console.log(typeof place._id);
    // console.log(place);

    return new Promise((resolve, reject) => {
      Place.find()
        .or([
          { name: place.name },
          { intlPhone: place.intlPhone },
          { address: place.address },
        ])
        .then(results => {
          // console.log('results', results);

          if (results.length === 1)
            Place.update(
              { _id: results[0]._id },
              {
                name: results[0].name,
                address: results[0].address,
                intlPhone: results[0].intlPhone,
                APiName: place._id,
              },
            )
              .then(updatedPlace =>
                resolve(
                  updatedPlace.nModified === 1
                    ? results[0]._id
                    : 'err: not modified',
                ),
              )
              .catch(err => reject(err));
          else if (results.length === 0) {
            // const reference = { APiName: place._id };

            // console.log('place name', place);

            Place({
              name: place.name,
              address: place.address,
              intlPhone: place.intlPhone,
              APiName: place.id,
            })
              .save()
              .then(savedPlace => resolve(savedPlace._id))
              .catch(err => console.log(err))
              .catch(err => reject(err));
          } else {
            resolve('more than 1 results');
          }
        });
    });
  });
};

module.exports = { fetchAPI, fetchAPIWith, createPlacesFrom };
