var react    = require('./react'),
    session  = require('./session'),
    user     = require('./user'),
    offering = require('./offering');

module.exports = function(app) {

  // Offering routes.
  offering(app);

  // User routes.
  user(app);

  // Session routes.
  session(app);

  // React routes.
  react(app);

};
