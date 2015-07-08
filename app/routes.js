/** @jsx React.DOM */
var React        = require('react'),
    Router       = require('react-router'),
    reactRoutes  = require('./reactRoutes.jsx'),
    utils        = require('../lib/utils.js'),
    jwt          = require('jsonwebtoken'),
    mongoose     = require('mongoose'),
    Offering     = mongoose.model('Offering'),
    Roastery     = mongoose.model('Roastery'),
    User         = mongoose.model('User'),
    async        = require('async'),
    LoginActions = require('./actions/LoginActions.js');

module.exports = function(app) {

  function createToken(user) {
    return jwt.sign(user, 'marzocco', { expiresInMinutes: 60 * 12 });
  }

  // Query Mongo to get matched coffees.
  app.post('/offerings/find', function(req, res, next) {
    
    Offering.find({}).exec(function(err, offerings) {
      if (err) throw err;

      var Filter    = new utils.Filter(offerings),
          available = Filter.processForm(req.body);

      return res.json(JSON.stringify(available));
    });
  });

  // Load a user's roasteries and offerings.
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

  // Respond to all other requests with React.
  app.get('*', function(req, res) {

    async.series([
        Offering.getRoasters.bind(Offering), // Get unique roasters.
        Offering.getOrigins.bind(Offering),  // Get unique origins.
        Offering.getOfferings.bind(Offering) // Get all offerings.
      ],

      // Called once all info is loaded.
      function(err, results) {
        if (err) throw err;

        var data = {
          roasters:  results[0],
          origins:   results[1],
          offerings: results[2]
        };

        // Create router and store reference.
        var router = Router.create({ location: req.url, routes: reactRoutes,
          onError: function(err) { throw err; },
          onAbort: function(reason) { res.redirect('https://localhost:8000/login'); }
        });

        // Check for jwt cookie.
        var cookieToken = req.cookies.jwt;
        if (cookieToken) {
          LoginActions.loginUserServer(cookieToken);
        }

        // Render to string.
        router.run(function(Handler) {
          var handler = <Handler data={data} />,
              html    = React.renderToString(handler);

          return res.render('index', {
            jsonProps: JSON.stringify({data: data}),
            reactOutput: html
          });
        });
      });
  });
};
