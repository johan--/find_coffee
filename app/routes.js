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

      var Available = new utils.Available(offerings),
          values    = req.body;

      // Filter offerings based on form values.
      Available.filter('ALL', values.search)
               .filter('blend', values.blend)
               .filter('decaf', values.decaf)
               .filter('direct', values.direct)
               .filter('organic', values.organic)
               .filter('origin', values.origin)
               .filter('process', values.process)
               .filter('roaster', values.roaster);

      return res.json(JSON.stringify(Available.offerings));
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

