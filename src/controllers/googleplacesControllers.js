const Googleplace = require('../models/googleplace');
const { fetchAPI } = require('./placesControllers');

const { APIs } = require('../../config.js');
const { urls, output, key } = APIs.googleplaces;

const getGoogleplacesTextsearchUrl = (query, location) => {
  return `${
    urls.textsearch
  }/${output}?key=${key}&type=restaurant&query=${query}+${location}`;
};

const getGooglePlacesDetailsUrl = placeId => {
  return `${urls.details}/${output}?key=${key}&placeid=${placeId}`;
};

const createGoogleplacePlacesFrom = data => {
  return data.results.map(place => {
    return new Promise((resolve, reject) => {
      Googleplace.find({ id: place.id })
        .then(results => {
          results.length > 0
            ? resolve(results)
            : resolve(
                new Promise((resolve, reject) => {
                  fetchAPI(getGooglePlacesDetailsUrl(place.place_id))
                    .then(details =>
                      Googleplace({
                        name: place.name,
                        address: place.formatted_address,
                        intlPhone: details.result.international_phone_number
                          ? details.result.international_phone_number.replace(
                              /[ -]/g,
                              '',
                            )
                          : '',
                        location: {
                          lat: place.geometry.lat,
                          lng: place.geometry.lng,
                        },
                        rating: place.rating,
                        id: place.id,
                        placeId: place.place_id,
                      })
                        .save()
                        .then(savedPlace => resolve(savedPlace))
                        .catch(err => reject(err)),
                    )
                    .catch(err => reject(err));
                }),
              );
        })
        .catch(err => reject(err));
    });
  });
};

// return Googleplace.find({ id: place.id })
//   .then(results => {
//     results.length > 0
//       ? Promise.resolve(results)
//       : new Promise((resolve, reject) => {
//           fetchAPI(getGooglePlacesDetailsUrl(place.place_id))
//             .then(details =>
//               Googleplace({
//                 name: place.name,
//                 address: place.formatted_address,
//                 intlPhone: details.result.international_phone_number
//                   ? details.result.international_phone_number.replace(
//                       /[ -]/g,
//                       '',
//                     )
//                   : '',
//                 location: {
//                   lat: place.geometry.lat,
//                   lng: place.geometry.lng,
//                 },
//                 rating: place.rating,
//                 id: place.id,
//                 placeId: place.place_id,
//               })
//                 .save()
//                 .then(savedPlace => resolve(savedPlace))
//                 .catch(err => reject(err)),
//             )
//             .catch(err => reject(err));
//         });
//   })
//   .catch(err => console.log(err));

// if (dbSearch) {
//   console.log(dbSearch);
//   return Promise.resolve(dbSearch[0]);
// }

// return new Promise((resolve, reject) => {
//   fetchAPI(getGooglePlacesDetailsUrl(place.place_id)).then(details =>
//     Googleplace({
//       name: place.name,
//       address: place.formatted_address,
//       intlPhone: details.result.international_phone_number
//         ? details.result.international_phone_number.replace(/[ -]/g, '')
//         : '',
//       location: { lat: place.geometry.lat, lng: place.geometry.lng },
//       rating: place.rating,
//       id: place.id,
//       placeId: place.place_id,
//     })
//       .save()
//       .then(savedPlace => resolve(savedPlace))
//       .catch(err => reject(err)),
//   );
// });
//   });
// };

module.exports = { getGoogleplacesTextsearchUrl, createGoogleplacePlacesFrom };
