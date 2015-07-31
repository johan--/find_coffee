/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      msg: '404. Not found.',
      className: ''
    };
  },

  render: function() {
    return <h1 className={this.props.className}>{this.props.msg}</h1>;
  }

});
