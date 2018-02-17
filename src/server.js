const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const config = require('../config.js');

const status = config.status;

const port = config.port;

const server = express();
server.use(bodyParser.json());

server.listen(port, err => {
  if (err) console.log(`There was an error starting the server: ${err}`);
  else console.log(`Server listening on port ${port}`);
});
