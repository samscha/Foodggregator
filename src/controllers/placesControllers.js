const Place = require('../models/place');

const fetch = require('node-fetch');
const cache = require('../cache');

const { APIsIndex } = require('../../config');
const { MATCH_PERCENT_THRESHOLD } = require('../../config');

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

const comebineThese = values => {
  let results = [];

  values[0].forEach(place => {
    results.push({
      name: place.name,
      address: place.address,
      intlPhone: place.intlPhone,
      googleplace: place,
    });
  });

  console.log('before', results.length);

  console.log(results);

  values[1].forEach(place => {
    console.log(place);
    const matchPhone = results.find(p => p.intlPhone === place.intlPhone);
    const matchAddress = results.find(p =>
      checkAddressesOf(p.address, place.address),
    );

    if (matchPhone) {
      matchPhone = { ...matchPhone, yelp: place };
    } else if (matchAddress) {
      matchAddress = { ...matchAddress, yelp: place };
    } else {
      results.push({
        name: place.name,
        address: place.address,
        intlPhone: place.intlPhone,
        yelp: place,
      });
    }
  });

  // results = combineData(values[1], result);

  console.log('after', results.length);
  return results;
};

// const createPlacesFrom = data => {
//   let results = [];

//   data[0].forEach(place => {
//     results.push({
//       name: place.name,
//       address: place.address,
//       intlPhone: place.intlPhone,
//       googleplace: place._id,
//     });
//   });

//   results = combineData(data[1], results);
//   return results;

//   return results.map(place => {
//     return new Promise((resolve, reject) => {
//       Place({
//         name: place.name,
//         address: place.address,
//         intlPhone: place.intlPhone,
//         googleplace: place.googleplace,
//         yelp: place.yelp,
//       })
//         .save()
//         .then(savedPlace => resolve(savedPlace))
//         .catch(err => reject(err));
//     });
//   });

//   // return data.map((API, i) => Promise.all(createPlacesFor(API, APIsIndex[i])));
// };

const combineData = (data, results) => {
  console.log('results', results.length);

  data.forEach(place => {
    console.log(place.name);
    const matchPhone = results.find(p => p.intlPhone === place.intlPhone);
    const matchAddress = results.find(p =>
      checkAddressesOf(p.address, place.address),
    );

    if (matchPhone) {
      matchPhone = { ...matchPhone, yelp: place };
    } else if (matchAddress) {
      matchAddress = { ...matchAddress, yelp: place };
    } else {
      results.push({
        name: place.name,
        address: place.address,
        intlPhone: place.intlPhone,
        yelp: place,
      });
    }

    // const matchAddress = results.find(p =>
    //   checkAddressesOf(p.address, place.address),
    // );

    // if (matchAddress) {
    //   matchAddress = { ...matchAddress, yelp: place };
    // }

    // results.push({
    //   name: place.name,
    //   address: place.address,
    //   intlPhone: place.intlPhone,
    //   yelp: place,
    // })
  });
  console.log('results', results.length);

  return results;
};

const checkAddressesOf = (place1, place2) => {
  // if (place1.length === 0 || place2.length === 0) return false;
  console.log(`${place1} -- ${place2}`);

  const addr1 = place1.replace(',', '').split(/ /g);
  const addr2 = place2.replace(',', '').split(/ /g);

  const match1 = addr1.filter(i => addr2.includes(i)).length / addr1.length;
  const match2 = addr2.filter(i => addr1.includes(i)).length / addr2.length;

  return (match1 + match2) / 2 > MATCH_PERCENT_THRESHOLD;
};

const createPlacesFor = data => {
  return data.map(place => {
    // const place = placeArr[0];
    // console.log(typeof place._id);
    // console.log(place);

    return new Promise((resolve, reject) => {
      // Place.find({
      //   // { name: place.name },
      //   intlPhone: place.intlPhone,
      //   // { address: place.address },
      // })
      // .or([
      //   { name: { $e: place.name } },
      //   { intlPhone: { $e: place.intlPhone } },
      //   { address: { $e: place.address } },
      // ])
      // .then(results => {
      //   // console.log('results', results);
      //   console.log('results', results);

      //   if (results.length === 1)
      //     Place.update(
      //       { _id: results[0]._id },
      //       {
      //         ...results[0],
      //         [APiName]: place._id,
      //       },
      //     )
      //       .then(updatedPlace =>
      //         resolve(
      //           updatedPlace.nModified === 1
      //             ? results[0]._id
      //             : 'err: not modified',
      //         ),
      //       )
      //       .catch(err => reject(err));
      //   else if (results.length === 0) {
      //     // const reference = { APiName: place._id };

      //     // console.log('place name', place);

      Place({
        name: place.name,
        address: place.address,
        intlPhone: place.intlPhone,
        [APiName]: place._id,
      })
        .save()
        .then(savedPlace => resolve(savedPlace))
        .catch(err => reject(err));
      // } else {
      //   resolve('more than 1 results');
      // }
    });
  });
  // });
};

// const findPlacesWith = ids => {
//   return new Promise((resolve, reject) => {
//     Place.find()
//       .where('_id')
//       .in(ids)
//       .then(places => resolve(places))
//       .catch(err => reject(err));
//   });
// };

module.exports = { fetchAPI, fetchAPIWith, comebineThese };
