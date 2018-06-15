const fetch = require('../../../../../../Library/Caches/typescript/2.9/node_modules/@types/node-fetch');
const cache = require('../cache');

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

module.exports = {
  fetchAPI,
  fetchAPIWith,
};
