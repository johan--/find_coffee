var jwt          = require('jsonwebtoken'),
    mongoose     = require('mongoose'),
    User         = mongoose.model('User'),
    LoginActions = require('../actions/LoginActions.js');

// Return JSON web token.
function createToken(user) {
  return jwt.sign(user, 'marzocco', { expiresInMinutes: 60 * 12 });
}

module.exports = function(app) {

  // Login
  app.post('/sessions/new', function(req, res) {

    if (!req.body.username || !req.body.password) {
      return res.status(400).send('Need both username and password.');
    }

    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(400).send('No user with that username was found.');
      }

      if (!user.authenticate(req.body.password)) {
        return res.status(401).send('Invalid password');
      }

      res.status(201).send({
        token: createToken(user)
      });
    });
  });

  // Logout
  app.post('/logout', function(req, res) {
    LoginActions.logoutUser();
    res.status(204);
  });

};
