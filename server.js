var express   = require('express'),
    https     = require('https'),
    path      = require('path'),
    fs        = require('fs'),
    app       = express();

require('node-jsx').install();

// Setup https server.
var credentials = {
  key:  fs.readFileSync('./ssl/server_key.pem', 'utf8'),
  cert: fs.readFileSync('./ssl/server_cert.pem', 'utf8')
};

var httpsServer = https.createServer(credentials, app);

// Views & Static assets
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./app/routes')(app);

// 404
app.get('*', function(req, res) {
  res.json({
    "route": "Sorry this page does not exist!"
  });
});

// Start
httpsServer.listen(8000, function(err) {
  if (err) { console.error(err); }
  console.log('HTTPS server listening on port 8000...');
});

// Expose
module.exports = app;
