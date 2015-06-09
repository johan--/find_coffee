/** @jsx React.DOM */
var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    CoffeeForm   = require('./CoffeeForm.jsx');

module.exports = React.createClass({

  render: function() {
    return <h1>Search the latest coffees from the country&#39;s best roasters.</h1>;
  }

});
