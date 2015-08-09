/** @jsx React.DOM */
var React = require('react'),
    request = require('request'),
    Tweet = require('./Tweet.jsx'),
    moment = require('moment');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      tweets: this.checkForCurrentTweets()
    };
  },

  getTweetsFromTwitter: function() {
    var url  = 'https://localhost:8000/roasters/twitter/',
        _id  = this.props._id,
        self = this;

    request(url + _id, function(err, res, body) {
      if (err) throw err;
      if (res.statusCode < 400) {
        var tweets = JSON.parse(res.body);
        self.setState({ tweets: tweets });
        self.setTweetsOnLocalStorage(tweets);
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

  getTweetsFromLocalStorage: function() {
    return JSON.parse(localStorage.getItem('TWEETS_' + this.props._id));
  },

  setTweetsOnLocalStorage: function(tweets) {
    var toStore = { tweets: tweets, lastUpdated: moment() };
    localStorage.setItem('TWEETS_' + this.props._id, JSON.stringify(toStore));
  },

  componentWillMount: function() {
    if (!this.state.tweets) {
      this.getTweetsFromTwitter();
    }
  },

  checkForCurrentTweets: function() {
    var tweets = this.getTweetsFromLocalStorage();

    if (tweets && this.isFromToday(tweets.lastUpdated)) {
      return tweets.tweets;
    } else {
      return null;
    }
  },

  isFromToday: function(date) {
    return moment(date) >= moment().startOf('day');
  },

  hasLoaded: function() {
    return this.state.tweets && this.state.tweets.length;
  },

  renderTweets: function() {
    return (
      <ul className="tweets">
        {this.getLatestTweets()}
      </ul>
    );
  },

  renderLoading: function() {
    return <p className="tweets">Loading...</p>;
  },

  render: function() {
    var content = this.hasLoaded() ? this.renderTweets() : this.renderLoading();

    return (
      <div className="twitterFeed">
        <h2 className="text-center">Latest Tweets</h2>
        {content}
      </div>
    );
  }

});
