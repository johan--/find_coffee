/** @jsx React.DOM */
var React        = require('react'),
    Link         = require('react-router').Link;

module.exports = React.createClass({

  getMessage: function() {
    return "Search the latest coffees from the country's best roasters.";
  },

  render: function() {
    return (
      <div>
        <h1 className="greeting">{this.getMessage()}</h1>
        <Link className="searchAll" to="offerings">Search all Offerings</Link>
      </div>
    );
  }

});
