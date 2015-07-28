/** @jsx React.DOM */
var React = require('react'),
    NotFound = require('./404.jsx');

module.exports = React.createClass({

  getMessage: function() {
    return "Oh no! Looks like nothing matched that search criteria.";
  },

  render: function() {
    return <NotFound msg={this.getMessage()} />;
  }

});
