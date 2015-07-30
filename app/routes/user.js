var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    async = require('async');

module.exports = function(app) {

  // Follow roaster and return updated user.
  app.get('/users/follow', function(req, res) {
    var user_id = req.query.user,
        roaster_id = req.query.roaster;

    User.followRoaster(user_id, roaster_id, function(err, num) {
      if (err) throw err;

      User.findOne({ _id: user_id }, function(err, user) {
        if (err) throw err;
        return res.status(200).json({ token: user.createToken() });
      });
    });
  });

  // Unfollow roaster and return updated user.
  app.get('/users/unfollow', function(req, res) {
    var user_id = req.query.user,
        roaster_id = req.query.roaster;

    User.unfollowRoaster(user_id, roaster_id, function(err, num) {
      if (err) throw err;

      User.findOne({ _id: user_id }, function(err, user) {
        if (err) throw err;
        return res.status(200).json({ token: user.createToken() });
      });
    });
  });

  // Load.
  app.get('/users/:_id', function(req, res) {
    User.load(req.params._id, function(err, userData) {
      if (err) return res.status(404).end();
      return res.json(userData);
    });
  });

  // Signup
  app.post('/users/new', function(req, res) {

    if (!req.body.username || !req.body.password) {
      return res.status(400).send('Need both a username and a password.');
    }

    var user = new User(req.body);

    user.password = user.encryptPassword(req.body.password);

    user.save(function(err) {
      if (err) {
        if (err.code === 11000) { // Duplicate key error
          return res.status(400).send('That username is already taken.');
        } else {
          throw err;
        }
      }

      res.status(201).send({
        token: user.createToken()
      });
    });
  });
};
