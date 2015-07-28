var react = require('./react'),
    session = require('./session'),
    user = require('./user'),
    roastery = require('./roastery'),
    offering = require('./offering');

module.exports = function(app) {

  // Offering routes.
  offering(app);

  // User routes.
  user(app);

  // Session routes.
  session(app);

  // Roaster routes.
  roastery(app);

  // React routes.
  react(app);

};
