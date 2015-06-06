/** @jsx React.DOM */
var React  = require('react'),
    Router = require('react-router');

var routes = require('./reactRoutes.jsx');

// Get props from server rendered HTML.
var props     = JSON.parse(document.getElementById('props').innerHTML),
    offerings = props.offerings,
    name      = props.name;

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params} user={name} offerings={offerings}/>,
      document.getElementById('mount-point'));
});
