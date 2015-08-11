/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    reactRoutes = require('../reactRoutes.jsx'),
    mongoose = require('mongoose'),
    Offering = mongoose.model('Offering'),
    Roastery = mongoose.model('Roastery'),
    async = require('async'),
    LoginActions = require('../actions/LoginActions.js');

module.exports = function(app) {

  // Responds to all requests with React Router.
  app.get('*', function(req, res) {

    async.series([
        Offering.getUniqueRoasters.bind(Offering), // Get unique roasters.
        Offering.getUniqueOrigins.bind(Offering),  // Get unique origins.
        Offering.getOfferings.bind(Offering), // Get all current offering objects.
        Roastery.getRoasters.bind(Roastery),  // Get all current roaster objects.
        Offering.getLastUpdate.bind(Offering) // Get date Mongo was last updated.
      ],

      // Called once all info is loaded.
      function(err, results) {
        if (err) return res.status(500).end();

        var data = {
          uniqueRoasterNames: results[0],
          uniqueOriginNames:  results[1],
          offerings:          results[2],
          roasters:           results[3],
          lastUpdated:        results[4],
          processes: ['Any', 'Natural', 'Honey', 'Washed']
        };

        // Create router.
        var router = Router.create({
          location: req.url,
          routes: reactRoutes,

          onAbort: function(reason) {
            res.redirect('https://localhost:8000/login');
          }
        });

        // Check for jwt cookie.
        var cookieToken = req.cookies.jwt;
        if (cookieToken) {
          LoginActions.loginUserServer(cookieToken);
        }

        // Render to string.
        router.run(function(Root) {
          var root = <Root data={data} />,
              html = React.renderToString(root);

          return res.render('index', {
            jsonProps: JSON.stringify({data: data}),
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
            reactOutput: html
          });
        });
      });
  });
};
