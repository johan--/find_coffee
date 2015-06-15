/** @jsx React.DOM */
var React    = require('react'),
    Router   = require('react-router'),
    routes   = require('./reactRoutes.jsx'),
    utils    = require('../lib/utils.js'),
    Offering = require('./db.js').Offering;

module.exports = function(app) {

  // Query the db to get matched coffees.
  app.post('/offerings/find', function(req, res, next) {
    
    Offering.find({}).exec(function(err, offerings) {
      if (err) throw err;

      var Filter    = new utils.Filter(offerings),
          available = Filter.processForm(req.body);

      return res.json(JSON.stringify(available));
    });
  });

  // Respond to all other requests with React.
  app.get('*', function(req, res) {
    var router = Router.create({ location: req.url, routes: routes });

    // Load all offerings.
    Offering.find({}, function(err, offerings) {
      if (err) return err;

      // Render to string.
      router.run(function(Handler) {
        var handler = <Handler user='' offerings={offerings} />,
            html    = React.renderToString(handler);

        return res.render('index', {
          jsonProps: JSON.stringify({ offerings: offerings, user: '' }),
          reactOutput: html
        });
      });
    });
  });
};
