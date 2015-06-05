/** @jsx React.DOM */
var React    = require('react'),
    Router   = require('react-router'),
    mongoose = require('mongoose'),
    routes   = require('./reactRoutes.jsx');

// Connect to Mongo / load models.
mongoose.connect('mongodb://localhost/getCoffee');
require(__dirname + '/models/Offering.js');
require(__dirname + '/models/Roastery.js');

// Load all offerings and render app
function renderApp(app) {
  var Offering = mongoose.model('Offering');

  app.use(function(req, res) {
    var router = Router.create({ location: req.url, routes: routes });

    // Load all offerings.
    Offering.find({}, function(err, offerings) {
      if (err) return err;

      // Render to string.
      router.run(function(Handler) {
        var html = React.renderToString(<Handler offerings={offerings} />);
        return res.render('index', {
          jsonProps: JSON.stringify({ offerings: offerings, name: 'Nathan' }),
          reactOutput: html
        });
      });
    });
  });
}

module.exports = renderApp;
