/** @jsx React.DOM */
var React         = require('react'),
    Router        = require('react-router'),
    request       = require('request'),
    mongoose      = require('mongoose'),
    InstagramFeed = require('./InstagramFeed.jsx'),
    TwitterFeed   = require('./TwitterFeed.jsx'),
    OfferingList  = require('./OfferingList.jsx'),
    RouteHandler  = Router.RouteHandler;

module.exports = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      roaster:   {},
      offerings: [],
      pics:      null,
      tweets:    null
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

  setOfferings: function() {
    var offerings = [],
        self = this;

    this.props.data.offerings.forEach(function(offering) {
      if (offering.roastery._id === self.state.roaster._id) {
        offerings.push(offering);
      }
    });

    this.setState({ offerings: offerings });
  },

  setRoasterOnServer: function(_id) {
    var Roastery = mongoose.model('Roastery'), self = this;

    Roastery.findOne({ _id: _id }, function(err, roaster) {
      if (err) throw err;

      if (!roasters) {
        self.setState({ roaster: {notFound: true} });
      } else {
        self.setState({ roaster: roaster });
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
        self.setOfferings();
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

  hasLoadedOfferings: function() {
    return this.state.offerings.length;
  },

  renderFound: function() {
    return (
      <div className="roasterPage">
        <div className="roasterProfile">
          <h1>{this.state.roaster.name}</h1>
          {this.renderAddress()}
          <h3>Current Offerings</h3>
          {this.renderOfferingsList()}
        </div>
        <div className="feeds">
          <h2 className="instagramHeader">Latest Instagram photos</h2>
          <InstagramFeed pics={this.state.pics} />
          <h2 className="twitterHeader">Latest Tweets</h2>
          <TwitterFeed tweets={this.state.tweets} />
        </div>
      </div>
    );
  },

  renderNotFound: function() {
    return <h1>No roaster found in database.</h1>;
  },

  renderLoading: function() {
    return <h1>Loading...</h1>;
  },

  renderOfferingsList: function() {
    if (this.hasLoadedOfferings()) {
      return <OfferingList hideRoaster={true}
                           perPage={10}
                           offerings={this.state.offerings} />;
    } else {
      return <div></div>;
    }
  },

  renderAddress: function() {
    var roaster = this.state.roaster;

    return (
      <ul className="roasterAddress">
        <li>{roaster.address}</li>
        <li>{roaster.city}, {roaster.state} {roaster.zip}</li>
      </ul>
    );
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
