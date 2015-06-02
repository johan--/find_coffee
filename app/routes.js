/** @jsx React.DOM */

var React    = require('react'),
    ReactApp = require('./components/ReactApp.jsx');


module.exports = function(app) {

  app.use('/', function(req, res, next) {
    var reactHTML = React.renderToString(<ReactApp />);

    res.render('index', { reactOutput: reactHTML });
  });
};
