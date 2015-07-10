/** @jsx React.DOM */
var React        = require('react'),
    CoffeeForm   = require('./CoffeeForm.jsx');

module.exports = React.createClass({

  getMessage: function() {
    return this.isAdmin() ? 'Welcome admin!' : 'Not authorized.';
  },

  isAdmin: function() {
    var user = this.props.user;
    return user && user.admin;
  },

  render: function() {
    return <h1>{this.getMessage()}</h1>;
  }

});
