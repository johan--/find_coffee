/** @jsx React.DOM */

var React    = require('react'),
    ReactApp = require('./components/ReactApp.jsx'),
    mongoose = require('mongoose');

// Connect to Mongo.
mongoose.connect('mongodb://localhost/getCoffee');

// Load models
require(__dirname + '/models/Offering.js');
require(__dirname + '/models/Roastery.js');

var Offering = mongoose.model('Offering');

module.exports = function(app) {

  app.use('/', function(req, res, next) {

    // Load all offerings.
    Offering.find({}, function(err, offerings) {
      if (err) { console.error(err) }

      // Render to string.
      var myApp = <ReactApp user="Nathan" coffees={offerings} homepage={true}/>,
          html  = React.renderToString(myApp);

      res.render('index', { reactOutput: html });
    });

  });
};
