var express         = require('express'),
    passport        = require('passport'),
    path            = require('path'),
    logger          = require('morgan'),
    React           = require('react'),
    favicon         = require('serve-favicon'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    flash           = require('connect-flash'),
    session         = require('express-session'),
    csrf            = require('csurf'),
    methodOverride  = require('method-override');

module.exports = function(app, passport) {

  // Static files
  app.use(express.static(path.join(__dirname, '../public')));

  // View engine
  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'jade');

  // Logger
  app.use(logger('dev'));

  // Method Override
  app.use(methodOverride('_method'));

  // Cookies & Sessions
  app.use(cookieParser('marzocco'));
  app.use(session({
    secret: 'marzocco',
    resave: false,
    saveUninitialized: false,
      cookie: { maxAge: 604800000 } // 1 week
  }));

  // Flash
  app.use(flash());

  // Use CSRF and make token available in views.
  if (process.env.NODE_ENV !== 'test') {
    app.use(csrf());
    app.use(function(req, res, next) {
      res.locals.csrf = req.csrfToken();
      next();
    });
  }

  // Make session status available in views.
  app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });
};
