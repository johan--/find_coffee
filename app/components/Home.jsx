/** @jsx React.DOM */
var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    Link         = require('react-router').Link,
    CoffeeForm   = require('./CoffeeForm.jsx');

module.exports = React.createClass({

  render: function() {
    return (
      <div>
        <h1>Search the latest coffees from the country&#39;s best roasters.</h1>
        <Link className="searchAll" to="offerings">Search all Offerings</Link>
      </div>
    );
  }

});
