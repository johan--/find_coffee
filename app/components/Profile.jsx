/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    jwt = require('jsonwebtoken'),
    request = require('request'),
    mongoose = require('mongoose'),
    Constants = require('../constants/Constants.js'),
    OfferingList = require('./OfferingList.jsx'),
    LoginActions = require('../actions/LoginActions.js'),
    LoginStore = require('../stores/LoginStore.js');

// Used for additional requests.
var timesAttempted = {
  getUser: 0,
  unfollow: 0,
  unwatch: 0
};

module.exports = React.createClass({
  mixins: [Router.Navigation],

  statics: {
    willTransitionTo: function(transition, params, query, cb) {
      if (!LoginStore.isLoggedIn()) {
        if (typeof window === 'undefined') {
          transition.abort();
        } else {
          transition.redirect('/login');
        }
      }
      cb();
    }
  },

  // Pull data from localStorage if possible.
  getInitialState: function() {
    if (this.isRenderingOnClient() && this.hasValidToken()) {
      return this.getUserFromToken();
    }
    return {
      user: null,
      roasters: null,
      offerings: { roaster: null, followed: null }
    };
  },

  getUserFromToken: function() {
    return JSON.parse(localStorage.getItem('USER_DATA'));
  },

  setUserOnToken: function(userData) {
    localStorage.setItem('USER_DATA', JSON.stringify(userData));
  },

  getUserFromServer: function() {
    var url = Constants.USER_URL,
        _id = this.props.user._id,
        self = this;

    request(url + _id, function(err, res, body) {
      if (err) {
        if (timesAttempted.getUser < 5) {
          ++timesAttempted.getUser;
          self.getUserFromServer();
        }
      }

      if (res.statusCode === 500) {
        // TODO: user with id wasn't found
      }

      if (res.statusCode < 400) {
        var userData = JSON.parse(body);
        self.setState(userData);
        self.setUserOnToken(userData);
      }
    });
  },

  componentDidMount: function() {
    this.getUserFromServer();
  },

  componentWillReceiveProps: function() {
    this.getUserFromServer();
  },

  hasValidToken: function() {
    var token = this.getUserFromToken();
    return !!(token && token.user && token.roasters &&
              token.offerings.roaster && token.offerings.followed);
  },

  isRenderingOnClient: function() {
    return typeof localStorage !== 'undefined';
  },

  getTypeOfClick: function(info) {
    var baseUrl = Constants.USER_URL,
        user = 'user=' + this.state.user._id,
        type, url;

    if (info.roaster_id) {
      type = 'unfollow';
      url = baseUrl + type + '/?' + user + '&' + 'roaster=' + info.roaster_id;

    } else if (info.offering_id) {
      type = 'unwatch';
      url = baseURL + type + '/?' + user + '&' + 'offering=' + info.offering_id;
    }

    return { type: type, url: url };
  },

  handleClick: function(info) {
    var clickInfo = this.getTypeOfClick(info),
        type = clickInfo.type,
        url = clickInfo.url;

    request(url, function(err, res, body) {
      if (err) {
        if (timesAttempted[type] < 5) {
          ++timesAttempted[type];
          self.handleClick(info);
        }
      }

      if (res.statusCode === 500) {
        // TODO: Inform user that op wasn't successful
      }

      if (res.statusCode === 200) {
        var token = JSON.parse(body).token;
        LoginActions.updateUser(token);
      }
    });
  },

  renderRoasters: function() {
    var roasters = this.state.roasters,
        self = this;

    if (this.isRenderingOnClient() && this.hasValidToken()) {

      if (roasters.length) {
        roasters = roasters.slice(0).map(function(roaster, index) {
          return (
            <li key={index}>
              <Link to="roaster" params={{ _id: roaster._id }}>
                {roaster.name}
              </Link>
              <button onClick={self.handleClick.bind(self, {roaster_id: roaster._id})}
                      className="unfollowBtn" >
                X
              </button>
            </li>
          );
        });
      } else {
        roasters = <li><p>Not currently following any roasters.</p></li>;
      }

      return (
        <div className="background profile-roasters col-xs-12 col-md-6">
          <h3>Your Roasters</h3>
          <ul>
            {roasters}
          </ul>
        </div>
      );

    }
  },

  // Offerings user has explicitly followed.
  renderFollowedOfferings: function() {
    var offerings = this.state.offerings.followed,
        msg = "Your offerings";

    if (offerings) {
      return (
        <div>
          <h3>{msg}</h3>
          <OfferingList hideRoaster={false}
                        removeButton={true}
                        msg={'You\'re not following any roasters.'}
                        handleClick={this.handleClick}
                        perPage={10}
                        offerings={offerings} />
        </div>
      );
    }
  },

  // All offerings from followed roasters.
  renderRoasterOfferings: function() {
    var offerings = this.state.offerings.roaster,
        msg = "Some current offerings from your roasters.";

    if (offerings) {
      return (
        <div className="background offerings-roaster col-xs-12 col-md-6">
          <h3>{msg}</h3>
          <OfferingList hideRoaster={false}
                        perPage={10}
                        msg={'Follow some roasters to see offerings here.'}
                        offerings={offerings} />
        </div>
      );
    }

  },

  renderLinks: function() {
    return (
      <div className="links">
        <Link to="roasters">Browse Roasters</Link>
        <Link to="offerings">Browse Offerings</Link>
      </div>
    );
  },

  render: function() {
    return (
      <div className="row profile">
        {this.renderLinks()}

        <div className="background offerings-followed col-xs-6 col-sm-3">
          {this.renderFollowedOfferings()}
        </div>

        <div className="profile-roaster-info col-xs-6 col-sm-8">
          <div className="row">
            {this.renderRoasters()}
            {this.renderRoasterOfferings()}
          </div>
        </div>

      </div>
    );
  }

});
