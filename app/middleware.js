var cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path');

module.exports = function(app) {

  // Parsers
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Views
  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'ejs');

  // Static assets.
  app.use(express.static(path.join(__dirname, '../public')));

};
