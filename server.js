const dev = process.env.DEV === 'true';

/**
 * dependencies
 */
const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const config = require('../config.js');
const cors = require('cors');
const path = require('path');

/**
 * dev dependencies
 */
if (dev) {
  // add any here if you'd like
}

/**
 * express server
 */
const server = express();
/**
 * development server config
 */
if (dev) {
  server.use(require('morgan')('combined'));
  // add more here if you'd like
}
/**
 * server config
 */
server.use(express.json());
server.use(cors({ origin: JSON.parse(process.env.CORS), credentials: true }));
/**
 * static files from /client
 */
server.use(express.static(path.join(__dirname, 'client/build')));
/**
 * api route handler
 */
server.use('/api', require('./api'));

/**
 * development test route only
 */
if (dev) {
  server.get(`/dev`, (req, res) => {
    res.send({ server: `running` });
  });
}

/**
 * the "catchall" handler required when building project for production
 *
 * https://daveceddia.com/deploy-react-express-app-heroku/
 *
 */
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// const places = require('./routes/places');

// mongoose.connect(
//   'mongodb://localhost/places',
//   config.useMongodAuth ? { user, pass, authSource } : null,
// );

module.exports = server;
