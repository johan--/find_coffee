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

var attempts = 0; // Used to retry requests.

module.exports = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      roaster:   null,
      offerings: []
    };
  },

  getOfferings: function(_id) {
    var offerings = [];

    this.props.data.offerings.forEach(function(offering) {
      if (offering.roastery._id === _id) {
        offerings.push(offering);
      }
    });

    return offerings;
  },

  getRoaster: function(_id) {
    var roasters = this.props.data.roasters;

    for (var i = 0, len = roasters.length; i < len; i++) {
      if (roasters[i]._id.toString() === _id) {
        return roasters[i];
      }
    }
    return 'NOT_FOUND';
  },

  componentWillMount: function() {
    var _id = this.props.params._id,
        roaster = this.getRoaster(_id);

    var offerings = roaster ? this.getOfferings(roaster._id) : [];

    this.setState({
      roaster: roaster,
      offerings: offerings,
    });
  },

  isLoggedIn: function() {
    return !!this.props.user;
  },

  isLoading: function() {
    return !this.state.roaster;
  },

  wasntFound: function() {
    return this.state.roaster === 'NOT_FOUND';
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
        roaster_id = 'roaster=' + this.state.roaster._id,
        self;

    var url = baseUrl + user_id + '&' + roaster_id;

    request(url, function(err, res, body) {
      if (err) {
        if (attempts < 5) {
          ++attempts;
          self.handleClick();
        }
      }

      if (res.statusCode === 500) {
        // error while following user
      }

      if (res.statusCode === 200) {
        var token = JSON.parse(body).token;
        LoginActions.updateUser(token);
      }
    });

  },

  renderOfferingsList: function() {
    return <OfferingList hideRoaster={true}
                         msg={'This roaster currently has no offerings.'}
                         perPage={10}
                         offerings={this.state.offerings} />;
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
    var _id = this.props.params._id,
        onServer = this.isRenderingOnServer();

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
          <InstagramFeed _id={_id} isRenderingOnServer={onServer} />
          <TwitterFeed _id={_id} isRenderingOnServer={onServer} />
        </div>
      </div>
    );
  },

  isRenderingOnServer: function() {
    return typeof localStorage === 'undefined';
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
      if (!this.wasntFound()) {
        return this.renderFound();
      } else {
        return this.renderNotFound();
      }
    }
  }

});
