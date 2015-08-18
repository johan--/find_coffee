/** @jsx React.DOM */
var React = require('react'),
    Link = require('react-router').Link;

module.exports = React.createClass({

  getMessage: function() {
    return "Find your next coffee";
  },

  render: function() {
    return (
      <div className="text-center greeting">
        <Link to="offerings">{this.getMessage()}</Link>
      </div>
    );
  }

});
