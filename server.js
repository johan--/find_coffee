require('node-jsx').install();

// Connect to Mongo and load models.
require('./app/db.js');

var middleware = require('./app/middleware'),
    express    = require('express'),
    routes     = require('./app/routes'),
    http       = require('http'),
    app        = express();

// Dokku will handle HTTPS, so use HTTP here.
var PORT = process.env.PORT || 80,
    server = http.createServer(app);

// Load middleware.
middleware(app);

// Load routes.
routes(app);

// Start server.
server.listen(PORT);
console.log('Listening at ', PORT, '...');

module.exports = app;
