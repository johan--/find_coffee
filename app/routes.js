/** @jsx React.DOM */

var React    = require('react'),
    ReactApp = React.createFactory(require('./components/ReactApp'));

module.exports = function(app) {

  app.use('/', function(req, res, next) {
    // Generate markup.
    var reactHTML = React.renderToString(ReactApp({}));
    // Output HTML
    res.render('index', { reactOutput: reactHTML });
  });
};
