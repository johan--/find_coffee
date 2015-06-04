/** @jsx React.DOM */

var React    = require('react'),
    ReactApp = require('./components/ReactApp.jsx'),
    mongoose = require('mongoose');

// Connect to Mongo / load models.
mongoose.connect('mongodb://localhost/getCoffee');
require(__dirname + '/models/Offering.js');
require(__dirname + '/models/Roastery.js');

// Load all offerings and render app
function renderApp(app) {
  var Offering = mongoose.model('Offering');

  app.use('/', function(req, res, next) {

    // Load all offerings.
    Offering.find({}, function(err, offerings) {
      if (err) { console.error(err) }

      // Render to string.
      var myApp = <ReactApp user="Nathan" offerings={offerings} homepage={true}/>,
          html  = React.renderToString(myApp);

      res.render('index', { reactOutput: html });
    });
  });
}

module.exports = renderApp;
