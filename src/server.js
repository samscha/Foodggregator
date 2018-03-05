const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('../config.js');
const cors = require('cors');

const { user, pass, authSource } = config.mongodAuth;

const places = require('./routes/places');

const port = config.port;

mongoose.connect(
  'mongodb://localhost/places',
  config.useMongodAuth ? { user, pass, authSource } : null,
);

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use('/places', places);

server.listen(port, err => {
  if (err) console.log(`There was an error starting the server: ${err}`);
  // else console.log(`Server listening on port ${port}`);
});
