/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <button name={this.props.name}>{this.props.text}</button>;
  }
});
