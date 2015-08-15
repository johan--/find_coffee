var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    async = require('async'),
    validateInputs = require('../../lib/utils.js');


module.exports = function(app) {

  // Follow roaster and return updated user.
  app.get('/users/follow', function(req, res) {
    var user_id = req.query.user,
        roaster_id = req.query.roaster;

    User.followRoaster(user_id, roaster_id, function(err, num) {
      if (err) throw err;
      return User.sendToken(user_id, res);
    });
  });

  // Unfollow roaster and return updated user.
  app.get('/users/unfollow', function(req, res) {
    var user_id = req.query.user,
        roaster_id = req.query.roaster;

    User.unfollowRoaster(user_id, roaster_id, function(err, num) {
      if (err) throw err;
      return User.sendToken(user_id, res);
    });
  });

  // Watch offering and return updated user.
  app.get('/users/watch', function(req, res) {
    var user_id = req.query.user,
        offering_id = req.query.offering;

    User.watchOffering(user_id, offering_id, function(err, num) {
      if (err) throw err;
      return User.sendToken(user_id, res);
    });
  });

  // Unfollow roaster and return updated user.
  app.get('/users/unwatch', function(req, res) {
    var user_id = req.query.user,
        offering_id = req.query.offering;

    User.unwatchOffering(user_id, offering_id, function(err, num) {
      if (err) throw err;
      return User.sendToken(user_id, res);
    });
  });

  // Load.
  app.get('/users/:_id', function(req, res) {
    User.load(req.params._id, function(err, userData) {
      if (err) return res.status(500).end();
      return res.json(userData);
    });
  });

  // Signup
  app.post('/users/new', function(req, res) {
    var validation = validateInputs(req.body);

    if (validation.failed) {
      return res.status(401).send(validation.errors[0].msg);
    }

    var user = new User(req.body);
    user.password = user.encryptPassword(req.body.password);

    user.save(function(err) {
      if (err) {
        if (err.code === 11000) { // Duplicate key error
          return res.status(401).send('That username is already taken.');
        } else {
          return res.status(500).send('Error while saving user.');
        }
      }

      res.status(201).send({
        token: user.createToken()
      });
    });
  });
};
