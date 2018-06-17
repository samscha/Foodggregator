/**
 * providers
 */
const googleplaces = require('../providers/googleplaces');
const yelp = require('../providers/yelp');

/**
 * utils
 */
const send = require('../../utils');

const placeMatchThreshold = process.env.PLACE_MATCH_PERCENT_THRESHOLD;

/**
 * combines places data from all providers
 * using JavaScript `Promise.all` (for parallel exec)
 *
 * values[0] = googleplaces
 * values[1] = yelp
 * ...
 * values[i] = other providers
 *
 * IMPORTANT NOTE:
 * - each provider's phone number field should have the key as `intlPhone` and
 *   be formatted as:
 *   {
 *      key: prop,
 *      intlPhone: 'string that conforms to /[ -]/g = (ex) => +0 123-456-7890'
 *   }
 *
 *   eventually this will become (in combined places):
 *   {
 *      intlPhone: '+0123456790'
 *   }
 * - each provider's returned value should have a `key` prop for its name amd
 *   the key `places` for its places data:
 *   {
 *      places: [ place1, place2, etc. ],
 *      key: 'provide name'
 *   }
 *
 * `forEach` provider places data in each `values` Array,
 * combine all into one Array
 */
exports.places = (req, res, next) => {
  Promise.all([
    googleplaces.search(req.geometry, req.q),
    yelp.search(req.geometry, req.q),
    // add more providers here
  ])
    .then(values => {
      const places = [];

      values.forEach(provider => combine(provider, places));

      req.places = places;

      next();
    })
    .catch(reason => send(res, reason, `error combining providers`, 500));
};

/**
 * private func for combining places
 *
 * if there are no places, add places
 * else check places and combine
 *
 * check places by:
 * - if there is a phone number match (!== -1), update the place
 * - if there is an address match (!== -1), update the place
 * - else add a new place
 *
 * @param {Object} provider - provider places to combine with `key` as
 *                            provider name and `places` as places data
 * @param {Array} places - combined places to combine into
 */
const combine = (provider, places) => {
  console.log(`${provider.key}: ${provider.places.length}`);
  if (places.length === 0) {
    provider.places.forEach(place => {
      places.push({
        id: place.id,
        name: place.name,
        address: place.address || ``,
        intlPhone: normalizePhoneNumber(place.intlPhone),
        [provider.key]: place,
      });
    });
    return;
  }

  provider.places.forEach(place => {
    const matchPhoneIndex = places.findIndex(
      p => p.intlPhone === place.intlPhone,
    );

    if (matchPhoneIndex !== -1) {
      places[matchPhoneIndex][provider.key] = place;
      return;
    }

    const matchAddressIndex = places.findIndex(p =>
      checkAddressesOf(place.address, p.address),
    );

    if (matchAddressIndex !== -1) {
      places[matchAddressIndex] = {
        ...places[matchAddressIndex],
        [provider.key]: place,
      };
      return;
    }

    places.push({
      id: place.id,
      name: place.name,
      address: place.address,
      intlPhone: normalizePhoneNumber(place.intlPhone),
      [provider.key]: place,
    });
  });
};

/**
 * helper function for combine private func (above)
 *
 * if a place doesn't have an address, `return` false
 *
 * @param {Object} place1 - provider place
 * @param {Object} place2 - combined places place
 */
const checkAddressesOf = (place1, place2) => {
  if (!place1 || !place2) return false;

  const addr1 = place1.replace(',', '').split(/ /g);
  const addr2 = place2.replace(',', '').split(/ /g);

  const match1 = addr1.filter(i => addr2.includes(i)).length / addr1.length;
  const match2 = addr2.filter(i => addr1.includes(i)).length / addr2.length;

  return (match1 + match2) / 2 > placeMatchThreshold;
};

/**
 * normalize phone numbers to `+01234567890` from phone numbers with
 * only spaces and dashes (e.g. `+0 123-456-7890`)
 *
 * note: as more providers are added, it may be necessary to add regex for
 *       ( ) and other phone number types
 *
 * @param {string} phoneNumber - phone number to normalizee
 */
const normalizePhoneNumber = phoneNumber => {
  if (!phoneNumber) return undefined;
  return phoneNumber.replace(/[ -]/g, '');
};
