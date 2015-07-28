/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    jwt = require('jsonwebtoken'),
    request = require('request'),
    mongoose = require('mongoose'),
    OfferingList = require('./OfferingList.jsx'),
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

  getInitialState: function() {
    if (this.isRenderingOnClient() && this.hasValidToken()) {
      return this.getUserFromToken();
    }
    return { user: null, offerings: null, roasters: null };
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

  hasValidToken: function() {
    var token = this.getUserFromToken();
    return !!(token && token.user && token.roasters && token.offerings);
  },

  isRenderingOnClient: function() {
    return typeof localStorage !== 'undefined';
  },

  renderRoasters: function() {
    var roasters = this.state.roasters;

    if (roasters) {
      roasters = roasters.slice(0).map(function(roaster) {
        return (
          <li>
            <Link to="roaster" params={{ _id: roaster._id }}>
              {roaster.name}
            </Link>
          </li>
        );
      });
    } 

    return (
      <div className="followedRoasters">
        <h2>Your Roasters</h2>
        <ul>
          {roasters}
        </ul>
      </div>
    );
  },

  renderOfferings: function() {
    var offerings = this.state.offerings;

    if (offerings) {
      return (
        <div className="followedOfferings">
          <h2>Your Offerings</h2>
          <OfferingList hideRoaster={false}
                        perPage={10}
                        offerings={offerings} />
        </div>
      );
    }
  },

  render: function() {
    return (
        <div>
          {this.renderRoasters()}
          {this.renderOfferings()}
        </div>
    );
  }

});
