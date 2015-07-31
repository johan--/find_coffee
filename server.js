require('node-jsx').install();

// Connect to Mongo and load models.
require('./app/db.js');

var middleware = require('./app/middleware'),
    express    = require('express'),
    routes     = require('./app/routes'),
    https      = require('https'),
    path       = require('path'),
    fs         = require('fs'),
    app        = express();

var credentials = {
  key:  fs.readFileSync('./ssl/SERVER_256.key', 'utf8'),
  cert: fs.readFileSync('./ssl/SERVER_256.crt', 'utf8')
};

var server = https.createServer(credentials, app);

// Load middleware.
middleware(app);

// Load routes.
routes(app);

// Start server.
server.listen(8000);
console.log('HTTPS server listening on port 8000...');

module.exports = app;
