/** @jsx React.DOM */
var React    = require('react'),
    Router   = require('react-router'),
    routes   = require('./reactRoutes.jsx'),
    Offering = require('./db.js').Offering;

module.exports = function(app) {

  // Query the db to get matched coffees.
  app.post('/offerings/find', function(req, res, next) {
    var values = req.body;
    
    Offering
      .find({})
      .where({ origin: /colombia/i })
      .exec(function(err, results){
        if (err) throw err;
        if (results.length) {
          res.json(JSON.stringify(results)); 
        }
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

