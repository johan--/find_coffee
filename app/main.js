/** @jsx React.DOM */
var React  = require('react'),
    Router = require('react-router');

var routes = require('./reactRoutes.jsx');

// Get props.
var props = JSON.parse(document.getElementById('props').innerHTML),
    offerings = props.offerings,
    name      = props.name;

window.OFFERINGS = {};

offerings.forEach(function(offering) {
  window.OFFERINGS[offering._id] = offering;
});

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params} user={name} offerings={offerings}/>,
      document.getElementById('mount-point'));
});
