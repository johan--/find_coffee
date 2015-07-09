var middleware = require('./app/middleware'),
    express    = require('express'),
    https      = require('https'),
    path       = require('path'),
    fs         = require('fs'),
    app        = express();

require('node-jsx').install();

// Connect to Mongo and load models.
require('./app/db.js');

var credentials = {
  key:  fs.readFileSync('./ssl/server_key.pem', 'utf8'),
  cert: fs.readFileSync('./ssl/server_cert.pem', 'utf8')
};

var server = https.createServer(credentials, app);

// Load middleware.
middleware(app);

// Load routes.
require('./app/routes')(app);

// Start server.
server.listen(8000);
console.log('HTTPS server listening on port 8000...');

module.exports = app;
