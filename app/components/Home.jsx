/** @jsx React.DOM */
var React = require('react'),
    Link = require('react-router').Link;

module.exports = React.createClass({

  getMessage: function() {
    return "Search the latest coffees from the country's best roasters.";
  },

  render: function() {
    return (
      <div className="text-center greeting">
        <h1>{this.getMessage()}</h1>
        <Link to="offerings">Search all Offerings</Link>
      </div>
    );
  }

});
