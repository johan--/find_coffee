/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    request = require('request'),
    LoginActions = require('../actions/LoginActions.js'),
    LoginStore = require('../stores/LoginStore.js'),
    InstagramFeed = require('./InstagramFeed.jsx'),
    TwitterFeed = require('./TwitterFeed.jsx'),
    OfferingList = require('./OfferingList.jsx'),
    RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      roaster:   {},
      offerings: []
    };
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

  setRoaster: function(_id) {
    var roasters = this.props.data.roasters;

    for (var i = 0, len = roasters.length; i < len; i++) {
      if (roasters[i]._id === _id) {
        return this.setState({ roaster: roasters[i] });
      }
    }

    this.setState({ roaster: {notFound: true} });
  },

  componentWillMount: function() {
    var self = this;

    this.setRoaster(this.props.params._id);

    setTimeout(function() {
      if (self.hasLoaded()) {
        self.setOfferings();
      }
    }, 0);
  },

  isLoading: function() {
    return Object.keys(this.state.roaster).length === 0;
  },

  isLoggedIn: function() {
    return !!this.props.user;
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

  isFollowingRoaster: function() {
    var roaster_id = this.props.params._id,
        roasters = this.props.user.roasteries;

    for (var i = 0, len = roasters.length; i < len; i++) {
      if (roaster_id === roasters[i]) {
        return true;
      }
    }

    return false;
  },

  handleClick: function() {
    var baseUrl = 'https://localhost:8000/users/follow/?',
        user_id = 'user=' + this.props.user._id,
        roaster_id = 'roaster=' + this.state.roaster._id;

    var url = baseUrl + user_id + '&' + roaster_id;

    request(url, function(err, res, body) {
      if (err) throw err;
      if (res.statusCode === 200) {
        var token = JSON.parse(body).token;
        LoginActions.updateUser(token);
      }
    });

  },

  renderOfferingsList: function() {
    if (this.hasLoadedOfferings()) {
      return <OfferingList hideRoaster={true}
                           msg={'This roaster currently has no offerings.'}
                           perPage={10}
                           offerings={this.state.offerings} />;
    } else {
      return <div></div>;
    }
  },

  renderAddress: function() {
    var roaster = this.state.roaster;

    return (
      <ul className="address text-center">
        <li>{roaster.address}</li>
        <li>{roaster.city}, {roaster.state} {roaster.zip}</li>
      </ul>
    );
  },

  renderFollowButton: function() {
    if (this.isLoggedIn() && !this.isFollowingRoaster()) {
      return (
        <button name="followButton"
                className="btn text-center"
                type="button"
                onClick={this.handleClick}>
                Follow {this.state.roaster.name}
        </button>
      );
    }
  },

  renderFound: function() {
    var _id = this.props.params._id;

    return (
      <div className="row roasterPage">
        <div className="col-xs-12 col-md-4 background roasterProfile">
          <h1 className="text-center">{this.state.roaster.name}</h1>
          {this.renderFollowButton()}
          {this.renderAddress()}
          <h3>Current Offerings</h3>
          {this.renderOfferingsList()}
        </div>
        <div className="col-xs-12 col-md-8 background feeds">
          <InstagramFeed _id={_id} />
          <TwitterFeed _id={_id} />
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
