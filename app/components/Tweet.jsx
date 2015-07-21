/** @jsx React.DOM */
var React = require('react'),
    moment = require('moment');

module.exports = React.createClass({

  getFormattedTime: function() {
    var created = new Date(this.props.created);
    return moment(created).format('llll');
  },

  render: function() {
    return (
      <li>
        {this.getFormattedTime()}: {this.props.text}
      </li>
    );
  }

});
