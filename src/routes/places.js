const express = require('express');
const config = require('../../config.js');
const cache = require('../cache');

const { fetchAPI, fetchAPIWith } = require('../controllers/placesControllers');

const {
  getGoogleplacesTextsearchUrl,
  createGoogleplacePlacesFrom,
} = require('../controllers/googleplacesControllers');

const {
  getYelpBusinessesSearchUrl,
  createYelpPlacesFrom,
} = require('../controllers/yelpControllers');

const router = express.Router();

const { OK, USER_ERROR, SERVER_ERROR } = config.status;
// const googleplacesAPI = config.APIs.googleplaces;
// const yelpAPI = config.APIs.yelp;

// const googleplacesTextsearchURL = `${googleplacesAPI.URL.textsearch}/${
//   gPlacesAPI.output
// }?key=${gPlacesAPI.key}&type=restaurant`;

// const yelpSearchURL = `${yelpAPI.URL.search}`;

// const fetchAPI = URL => {
//   return new Promise((resolve, reject) => {
//     fetch(URL)
//       .then(res => res.json())
//       .then(data => resolve(data))
//       .catch(err => reject(err));
//   });
// };

// const fetchAPIWithOptions = (URL, options) => {
//   return new Promise((resolve, reject) => {
//     fetch(URL, options)
//       .then(res => res.json())
//       .then(data => (cache[URL] = data))
//       .then(_ => resolve(cache[URL]))
//       .catch(err => reject(err));
//   });
// };

// const combine = (gMapsData, yelpData) => {
//   // list = [
//   //          { name_1: [ {Google Places: data}, {Yelp: data} ] },
//   //          { name_2: [ {              ...                } ] },
//   //        ]

//   // notes:
//   //       address formatted as:
//   //       [Street], [City], [State Abbrev.] [Zip], [Country]
//   //       or Google Places Web Service API formatted_address

//   const list = [];
//   // const tmpList = {};

//   gMapsData.forEach(gMapsPlacesData => {
//     // list.push({
//     //   [gMapsPlacesData.formatted_address]: [{ 'Google Places': gMapsPlacesData }],
//     // });
//     list.push({
//       [gMapsPlacesData.name]: [
//         {
//           'Google Places': gMapsPlacesData,
//         },
//       ],
//     });
//   });

//   yelpData.forEach(yelpData => {
//     let address =
//       yelpData.location.display_address.join(', ') +
//       `, ${yelpData.location.country}A`;

//     // const listRestaurant = list.find(
//     //   restaurant => Object.keys(restaurant)[0] === address,
//     // );
//     const listRestaurant = list.find(
//       restaurant =>
//         Object.keys(Object.values(restaurant)[0][0])[0] === 'Google Places'
//           ? Object.values(restaurant)[0][0]['Google Places']
//               .formatted_address === address ||
//             Object.values(restaurant)[0][0]['Google Places'].name.includes(
//               yelpData.name,
//             )
//           : false,
//     );

//     // console.log(listRestaurant);

//     if (listRestaurant !== undefined) {
//       listRestaurant[Object.keys(listRestaurant)[0]].push({ Yelp: yelpData });
//     } else {
//       list.push({
//         [yelpData.name]: [
//           {
//             Yelp: yelpData,
//           },
//         ],
//       });
//     }

//     // console.log(list);
//   });

//   // data.forEach(dataFromAPI => {
//   //   dataFromAPI.forEach(place => {
//   //     if (
//   //       place.formatted_address.includes('USA') ||
//   //       place.location.country === 'US'
//   //     ) {
//   //       let address = '';

//   //       if (place.formatted_address) address = place.formatted_address;
//   //       else if (place.location.display_address)
//   //         address =
//   //           place.location.display_address.join(' ') +
//   //           `, ${place.location.country}A`;
//   //       else {
//   //         const err = 'Found address structure not in GMaps nor Yelp.';

//   //         list.error
//   //           ? (list.error.addressStructure = err)
//   //           : (list.error = {
//   //               addressStructure: err,
//   //             });
//   //       }
//   //     } else {
//   //       const err = 'Found an address not in the US.';

//   //       list.error
//   //         ? (list.error.nonUSAddress = err)
//   //         : (list.error = { nonUSAddress: err });
//   //     }

//   //  list.address ? list.address = [].concat({
//   //    place
//   //   })

//   //

//   // list[place.name]
//   //   ? (list[place.name] = list[place.name].concat(
//   //       place,
//   //     ))
//   //   : (list[place.name] = [].concat(place));

//   //

//   // if (list.filter(placeList => placeList.name !== place.name)
//   //   .length > 0) {
//   //     const places = Object.values(list.filter(
//   //       placeList => placeList.name !== place.name,
//   //     )[0]).push(place)

//   //   }

//   //   ? list[
//   //       list.indexOf(
//   //         list.filter(
//   //           placeList => placeList.name !== place.name,
//   //         )[0],
//   //       )
//   //     ].push(place)
//   //   : list.push({ [place.name]: [place] });
//   // });
//   // list.filter(place => place.name !== dataAPI.name).length > 0
//   //   ? list[
//   //       list.indexOf(
//   //         list.filter(place => place.name !== dataAPI.name),
//   //       )
//   //     ].push(dataAPI)
//   //   : list.push({ [dataAPI.name]: [dataAPI] });
//   // list.push({ [dataAPI.name]: [dataAPI] });
//   // });

//   // console.log(list);

//   return list;
// };

router.post('/', (req, res) => {
  const { query, location } = req.body;

  // const googleplacesUrl = `${googleplacesTextsearchURL}&query=${query}+${location}`;
  const googleplacesUrl = getGoogleplacesTextsearchUrl(query, location);
  const { yelpUrl, yelpOptions } = getYelpBusinessesSearchUrl(query, location);

  // const {
  //   yelpUrl,
  //   options,
  // } = `${yelpSearchURL}?term=${query}&location=${location}`;
  // const yelpOptions = {
  //   headers: { Authorization: `Bearer ${yelpAPI.key}` },
  // };

  /* fordebugging */
  // fetchAPIWith(yelpUrl, yelpOptions)
  //   .then(data => res.json(data))
  //   .catch(_ => {});
  // return;

  // const debug = false;

  // if (debug) {
  //   const gresults = require('../../example-data/googleplaces');
  //   const yelpres = require('../../example-data/yelp');

  //   cache[googleplacesUrl] = gresults;
  //   cache[yelpUrl] = yelpres;

  //   Promise.all([
  //     cache[googleplacesUrl]
  //       ? Promise.resolve(cache[googleplacesUrl])
  //       : console.log('err adding to cache'),
  //     // addGPlacesDetails(googleplacesUrl),
  //     // gPlacesDetailsHelper(googleplacesUrl),
  //     cache[yelpUrl]
  //       ? Promise.resolve(cache[yelpUrl])
  //       : console.log('err adding to cache'),
  //   ]).then(values => {
  //     const gMapsData = values[0].results;
  //     const yelpData = values[1].businesses;

  //     const combinedData = combine(gMapsData, yelpData);
  //     // console.log(combinedData);

  //     // console.log(yelpData);
  //     res.status(OK).send(combinedData);
  //     return;
  //   });
  //   return;
  // }

  Promise.all([
    cache[googleplacesUrl]
      ? Promise.resolve(cache[googleplacesUrl])
      : fetchAPI(googleplacesUrl),
    // addGPlacesDetails(googleplacesUrl),
    // gPlacesDetailsHelper(googleplacesUrl),
    cache[yelpUrl]
      ? Promise.resolve(cache[yelpUrl])
      : fetchAPIWith(yelpUrl, yelpOptions),
  ])
    .then(values => {
      // console.log('values from route promise all');
      Promise.all([
        Promise.all(createGoogleplacePlacesFrom(values[0])),
        Promise.all(createYelpPlacesFrom(values[1])),
      ])
        .then(values => {
          res.status(OK).json({ g: values[0], y: values[1] });
        })
        .catch(err => res.status(SERVER_ERROR).json(err));
      //  }).catch

      //   const gResults =
      //   const yResults = Promise.all(createYelpPlacesFrom(values[1]))

      //     .then(values => res.status(OK).json({ g: values[0], y: values[1] }))
      //     .catch(err => res.status(SERVER_ERROR).json(err));
      // const dataSterilized = values.map(data => {
      //   return sterilize(data)
      // });

      // const gMapsData = values[0].results;
      // const yelpData = values[1].businesses;

      // const combinedData = combine(gMapsData, yelpData);
      // console.log(combinedData);

      // console.log(yelpData);
      // res.status(OK).json({ gp: googleplaceResults, y: yelpResults });
      // })
      // .catch(err => res.status(SERVER_ERROR).json(err));
    })
    .catch(err => res.status(SERVER_ERROR).json(err));
});

module.exports = router;
