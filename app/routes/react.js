/** @jsx React.DOM */
var React        = require('react'),
    Router       = require('react-router'),
    reactRoutes  = require('../reactRoutes.jsx'),
    mongoose     = require('mongoose'),
    Offering     = mongoose.model('Offering'),
    async        = require('async'),
    LoginActions = require('../actions/LoginActions.js');

module.exports = function(app) {

  // Responds to all requests with React Router.
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
          offerings: results[2],
          processes: ['Any', 'Natural', 'Honey', 'Washed']
        };

        // Create router.
        var router = Router.create({
          location: req.url,
          routes: reactRoutes,

          onError: function(err) {
            throw err;
          },

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
            reactOutput: html
          });
        });
      });
  });
};