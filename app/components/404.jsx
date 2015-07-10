/** @jsx React.DOM */
var React   = require('react');

module.exports = React.createClass({

  getMessage: function() {
    return this.props.msg || '404. Not found.';
  },

  getClassName: function() {
    return this.props.className || '';
  },

  render: function() {
    return <h2 className={this.getClassName()}>{this.getMessage()}</h2>;
  }

});
