const debug = process.env.DEBUG === 'true';

const server = require('./src/server');

const port = process.env.PORT || 5555;

server.listen(port, _ => {
  debug ? console.log(`Listening on port: ${port}`) : null;
});
