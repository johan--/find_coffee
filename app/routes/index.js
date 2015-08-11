var react = require('./react'),
    session = require('./session'),
    user = require('./user'),
    roastery = require('./roastery');

module.exports = function(app) {

  // User routes.
  user(app);

  // Session routes.
  session(app);

  // Roaster routes.
  roastery(app);

  // React routes.
  react(app);

};
