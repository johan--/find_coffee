/** @jsx React.DOM */
var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    CoffeeForm   = require('./CoffeeForm.jsx');

module.exports = React.createClass({

  render: function() {
    var msg = "Search the latest coffees from the country's best roasters.";
    return (
        <div>
          <h3>{msg}</h3>;
          <CoffeeForm />
        </div>
    );
  }

});
