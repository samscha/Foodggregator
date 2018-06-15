const fetch = require('node-fetch');

const send = require('../../utils');

module.exports = (uri, options = undefined, cb) => {
  return fetch(uri, options)
    .then(res => res.json())
    .then(json => cb(null, json))
    .catch(err => cb(err, null));
};
