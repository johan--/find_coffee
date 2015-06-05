/** @jsx React.DOM */
var React   = require('react');

module.exports = React.createClass({

  render: function() {
    var msg = this.props.msg || '404. Not found.';
    return <h2>{msg}</h2>;
  }

});
