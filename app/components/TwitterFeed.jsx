/** @jsx React.DOM */
var React = require('react'),
    Tweet = require('./Tweet.jsx');

module.exports = React.createClass({

  hasTweets: function() {
    return this.props.tweets && this.props.tweets.length;
  },

  renderList: function() {
    var tweets = [];

    // Only use the last ten tweets.
    for (var i = 0; i < 10; i++) {
      var tweet = this.props.tweets[i];
      if (tweet) {
        tweets.push(<Tweet created={tweet.created_at} text={tweet.text} />);
      }
    }

    return <ul>{tweets}</ul>;
  },

  render: function() {
    if (this.hasTweets()) {
      return this.renderList();
    } else {
      return <div></div>;
    }
  }

});
