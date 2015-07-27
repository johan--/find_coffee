/** @jsx React.DOM */
var React = require('react'),
    request = require('request'),
    Tweet = require('./Tweet.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      tweets: null
    };
  },

  getTweets: function() {
    var url  = 'https://localhost:8000/roasters/twitter/',
        _id  = this.props._id,
        self = this;

    request(url + _id, function(err, res, body) {
      if (err) throw err;
      if (res.statusCode < 400) {
        self.setState({ tweets: JSON.parse(res.body) });
      }
    });
  },

  getLatestTweets: function() {
    var tweets = [], tweet;

    for (var i = 0; i < 10; i++) {
      tweet = this.state.tweets[i];
      if (tweet) {
        tweets.push(<Tweet created={tweet.created_at} text={tweet.text} />);
      }
    }

    return tweets;
  },

  componentWillMount: function() {
    this.getTweets();
  },

  hasLoaded: function() {
    return this.state.tweets && this.state.tweets.length;
  },

  renderTweets: function() {
    return (
      <ul>
        {this.getLatestTweets()}
      </ul>
    );
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  },

  render: function() {
    var content = this.hasLoaded() ? this.renderTweets() : this.renderLoading();

    return (
      <div className="twitterFeed">
        <h2 className="twitterHeader">Latest Tweets</h2>
        {content}
      </div>
    );
  }

});
