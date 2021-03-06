/** @jsx React.DOM */
var React = require('react'),
    moment = require('moment'),
    getDecodedText = require('../../lib/utils.js').getDecodedText;

module.exports = React.createClass({

  getFormattedTime: function() {
    var created = new Date(this.props.created);
    return moment(created).format('LL');
  },

  render: function() {
    return (
      <li className="tweet">
        <span className="tweetTime">{this.getFormattedTime()}</span><br/>
        <span className="tweetText">{getDecodedText(this.props.text)}</span>
      </li>
    );
  }

});
