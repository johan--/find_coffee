/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  componentDidMount: function() {
    console.log('header mounted!');
  },

  render: function() {
    return (
        <header>
          <span>{this.props.user.name}</span>
          <span>{this.props.loggedIn ? 'In' : 'Out'}</span>
        </header>
    );
  }

});
