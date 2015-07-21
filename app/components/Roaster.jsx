/** @jsx React.DOM */
var React         = require('react'),
    Router        = require('react-router'),
    request       = require('request'),
    mongoose      = require('mongoose'),
    InstagramFeed = require('./InstagramFeed.jsx'),
    TwitterFeed   = require('./TwitterFeed.jsx'),
    RouteHandler  = Router.RouteHandler;

module.exports = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      roaster: {},
      pics:    null,
      tweets:  null
    };
  },

  getPics: function() {
    var pics = this.state.pics,
        links = [];

    if (pics) {
      pics.forEach(function(pic) {
        links.push({ link: pic.link, user: pic.user.username });
      });
    }

    return links;
  },

  setRoasterOnServer: function(_id) {
    var Roastery = mongoose.model('Roastery'), self = this;

    Roastery.find({ _id: _id }, function(err, roasters) {
      if (err) throw err;

      if (!roasters) {
        self.setState({ roaster: {notFound: true} });
      } else {
        self.setState({ roaster: roasters[0] });
      }
    });
  },

  setRoasterOnClient: function(_id) {
    var roasters = this.props.data.roasters;

    for (var i = 0, len = roasters.length; i < len; i++) {
      if (roasters[i]._id === _id) {
        return this.setState({ roaster: roasters[i] });
      }
    }
    this.setState({ roaster: {notFound: true} });
  },

  setTweets: function() {
    var url  = 'https://localhost:8000/roasters/twitter/',
        _id  = this.props.params._id,
        self = this;

    request(url + _id, function(err, res, body) {
      if (err) throw err;
      if (res.statusCode < 400) {
        self.setState({ tweets: JSON.parse(res.body) });
      }
    });
  },

  setPics: function() {
    var url  = 'https://localhost:8000/roasters/instagram/',
        _id  = this.props.params._id,
        self = this;

    request(url + _id, function(err, res, body) {
      if (err) throw err;
      if (res.statusCode < 400) {
        self.setState({ pics: JSON.parse(res.body) });
      }
    });
  },

  componentDidMount: function() {
    var _id = this.props.params._id,
        self = this;

    if (typeof window === 'undefined') {
      this.setRoasterOnServer.call(this, _id);
    } else {
      this.setRoasterOnClient.call(this, _id);
    }

    setTimeout(function() {
      if (self.hasLoaded()) {
        self.setPics();
        self.setTweets();
      }
    }, 0);
  },

  isLoading: function() {
    return Object.keys(this.state.roaster).length === 0;
  },

  isFound: function() {
    return !this.state.roaster.notFound;
  },

  hasLoaded: function() {
    return this.isFound() && !this.isLoading();
  },

  renderFound: function() {
    return (
      <div>
        <h1>{this.state.roaster.name}</h1>
        <InstagramFeed pics={this.state.pics} />
        <TwitterFeed tweets={this.state.tweets} />
      </div>
    );
  },

  renderNotFound: function() {
    return <h1>No roaster found in database.</h1>;
  },

  renderLoading: function() {
    return <h1>Loading...</h1>;
  },

  render: function() {

    // Handle loading.
    if (this.isLoading()) {
      return this.renderLoading();

    // Handle found or not found.
    } else {
      if (this.hasLoaded()) {
        return this.renderFound();
      } else {
        return this.renderNotFound();
      }
    }
  }

});
