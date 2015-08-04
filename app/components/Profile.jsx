/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    jwt = require('jsonwebtoken'),
    request = require('request'),
    mongoose = require('mongoose'),
    OfferingList = require('./OfferingList.jsx'),
    LoginActions = require('../actions/LoginActions.js'),
    LoginStore = require('../stores/LoginStore.js');

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
    var url = 'https://localhost:8000/users/',
        _id = this.props.user._id,
        self = this;

    request(url + _id, function(err, res, body) {
      if (err) throw err;

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


  handleClick: function(info) {
    var baseURL = 'https://localhost:8000/users/',
        user = 'user=' + this.state.user._id,
        roaster, offering, url;

    if (info.roaster_id) {
      roaster = 'roaster=' + info.roaster_id;
      url = baseURL + 'unfollow/?' + user + '&' + roaster;
    } else if (info.offering_id) {
      offering = 'offering=' + info.offering_id;
      url = baseURL + 'unwatch/?' + user + '&' + offering;
    }

    request(url, function(err, res, body) {
      if (err) throw err;
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
        roasters = roasters.slice(0).map(function(roaster) {
          return (
            <li>
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
