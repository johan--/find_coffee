var mongoose = require('mongoose'),
    User     = mongoose.model('User'),
    async    = require('async');

module.exports = function(app) {

  // Load.
  app.post('/load', function(req, res, next) {

    async.waterfall([

      // Load user.
      function(cb) {
        User.find({ _id: req.body._id }, function(err, user) {
          if (err) return cb(err);
          cb(null, user);
        });
      },

      // Get offerings/roasteries.
      function(user, cb) {
        var currentUser = new User(user);

        async.parallel([
          currentUser.getRoasteries.bind(currentUser),
          currentUser.getOfferings.bind(currentUser)
        ],
        function(err, results) {
          if (err) return cb(err);

          var data = { roasteries: results[0], offerings: results[1] };
          return res.json(JSON.stringify(data));
        });
      }

    ]);
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
        token: createToken(user)
      });
    });
  });
};
