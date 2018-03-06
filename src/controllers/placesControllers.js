const Place = require('../models/place');

const { MATCH_PERCENT_THRESHOLD, status } = require('../../config');
const { OK, USER_ERROR, SERVER_ERROR } = status;

const sendPlaces = (req, res) => {
  const { googleplacesDb, yelpsDb } = req;

  const combinedPlaces = comebineThese([googleplacesDb, yelpsDb]);

  Promise.all(createPlacesFrom(combinedPlaces))
    .then(values => {
      findPlacesWith(values)
        .then(places => res.status(OK).json([req.geocode].concat(places)))
        .catch(err => res.status(SERVER_ERROR).json(err));
    })
    .catch(reason => res.status(SERVER_ERROR).json(reason));
};

const comebineThese = values => {
  let results = [];

  values[0].forEach(place => {
    results.push({
      id: place.id,
      name: place.name,
      address: place.address,
      intlPhone: place.intlPhone,
      googleplace: place,
    });
  });

  values[1].forEach(place => {
    const matchPhoneIndex = results.findIndex(
      p => p.intlPhone === place.intlPhone,
    );

    const matchAddressIndex = results.findIndex(p =>
      checkAddressesOf(p.address, place.address),
    );

    if (matchPhoneIndex !== -1) {
      results[matchPhoneIndex] = { ...results[matchPhoneIndex], yelp: place };
    } else if (matchAddressIndex !== -1) {
      results[matchAddressIndex] = {
        ...results[matchAddressIndex],
        yelp: place,
      };
    } else {
      results.push({
        id: place.id,
        name: place.name,
        address: place.address,
        intlPhone: place.intlPhone,
        yelp: place,
      });
    }
  });

  return results;
};

const createPlacesFrom = data => {
  return data.map(place => {
    return new Promise((resolve, reject) => {
      Place.find({ id: place.id }).then(
        results =>
          results.length === 1
            ? resolve(results[0]._id)
            : Place({
                id: place.id,
                name: place.name,
                address: place.address,
                intlPhone: place.intlPhone,
                googleplace: place.googleplace ? place.googleplace._id : null,
                yelp: place.yelp ? place.yelp._id : null,
              })
                .save()
                .then(savedPlace => resolve(savedPlace._id))
                .catch(err => reject(err)),
      );
    });
  });
};

const checkAddressesOf = (place1, place2) => {
  const addr1 = place1.replace(',', '').split(/ /g);
  const addr2 = place2.replace(',', '').split(/ /g);

  const match1 = addr1.filter(i => addr2.includes(i)).length / addr1.length;
  const match2 = addr2.filter(i => addr1.includes(i)).length / addr2.length;

  return (match1 + match2) / 2 > MATCH_PERCENT_THRESHOLD;
};

const findPlacesWith = ids => {
  return new Promise((resolve, reject) => {
    Place.find()
      .where('_id')
      .in(ids)
      .populate('googleplace yelp')
      .then(places => resolve(places))
      .catch(err => reject(err));
  });
};

module.exports = {
  sendPlaces,
};
