/** @jsx React.DOM */
var React    = require('react'),
    Router   = require('react-router'),
    routes   = require('./reactRoutes.jsx'),
    utils    = require('../lib/utils.js'),
    jwt      = require('jsonwebtoken'),
    Offering = require('./db.js').Offering,
    User     = require('./db.js').User;

module.exports = function(app) {

  function createToken(user) {
    return jwt.sign(user, 'marzocco', { expiresInMinutes: 60 * 12 });
  }

  // Query the db to get matched coffees.
  app.post('/offerings/find', function(req, res, next) {
    
    Offering.find({}).exec(function(err, offerings) {
      if (err) throw err;

      var Filter    = new utils.Filter(offerings),
          available = Filter.processForm(req.body);

      return res.json(JSON.stringify(available));
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

  // Respond to all other requests with React.
  app.get('*', function(req, res) {
    var router = Router.create({ location: req.url, routes: routes });

    // Load all offerings.
    Offering.find({}, function(err, offerings) {
      if (err) return err;

      // Get roaster names.
      Offering.distinct('roastery.name', function(err, roasters) {

        // Add any option to roasters.
        roasters.unshift('Any');

        // Render to string.
        router.run(function(Handler) {
          var handler = <Handler roasters={roasters} offerings={offerings} />,
              html    = React.renderToString(handler);

          return res.render('index', {
            jsonProps: JSON.stringify({ offerings: offerings, roasters: roasters, }),
            reactOutput: html
          });
        });
      });
    });
  });
};
