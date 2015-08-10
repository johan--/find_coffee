/** @jsx React.DOM */
var React = require('react'),
    request = require('request'),
    Tweet = require('./Tweet.jsx'),
    moment = require('moment');

module.exports = React.createClass({

  getInitialState: function() {
    return this.checkForCurrentTweets();
  },

  getTweetsFromTwitter: function() {
    var url  = 'https://localhost:8000/roasters/twitter/',
        _id  = this.props._id,
        self = this,
        tweets;

    request(url + _id, function(err, res, body) {
      if (err) return self.setState({ tweets: 'ERR_WHILE_LOADING' });

      if (res.statusCode < 400) {
        tweets = JSON.parse(res.body);

        self.setState({ tweets: tweets, hasLoaded: true });
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
    var tweets = this.getTweetsFromLocalStorage(),
        loadedTweets;

    loadedTweets = tweets && this.isFromToday(tweets.lastUpdated) ?
      tweets.tweets :
      null;

    return { tweets: loadedTweets, hasLoaded: true };
  },

  isFromToday: function(date) {
    return moment(date) >= moment().startOf('day');
  },

  renderNoTweets: function() {
    return <p>{"It looks like this roastery doesn't have a Twitter account."}</p>;
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

  renderError: function() {
    return (
      <p>An error occured while fetching Tweets.
        <button className="btn" onClick={this.getTweetsFromTwitter}>
          Try again.
        </button>
      </p>
    );
  },

  hadErrorWhileLoading: function() {
    return this.state.tweets === 'ERR_WHILE_LOADING';
  },

  hasTweets: function() {
    var tweets = this.state.tweets;
    return tweets && tweets.length;
  },

  render: function() {
    var content;

    if (this.hadErrorWhileLoading()) {
      content = this.renderError();
    } else {
      if (this.state.hasLoaded) {
        content = this.hasTweets() ? this.renderTweets() : this.renderNoTweets();
      } else {
        content = this.renderLoading();
      }
    }

    return (
      <div className="twitterFeed">
        <h2 className="text-center">Latest Tweets</h2>
        {content}
      </div>
    );
  }

});
