/** @jsx React.DOM */
var React   = require('react');

module.exports = React.createClass({

  render: function() {
    var msg       = this.props.msg || '404. Not found.',
        className = this.props.className || '';

    return <h2 className={className}>{msg}</h2>;
  }

});
