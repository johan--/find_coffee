/** @jsx React.DOM */
var React      = require('react'),
    Router     = require('react-router'),
    request    = require('request'),
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
    return {
      roasters: null,
      offerings: null
    };
  },

  getUser: function() {
    var url = 'https://localhost:8000/users/',
        _id = this.props.user._id,
        self = this;

    request(url + _id, function(err, res, body) {
      if (err) throw err;

      if (res.statusCode < 400) {
        var data = JSON.parse(body);

        self.setState({
          roasters: data.roasteries,
          offerings: data.offerings
        });
      }
    });
  },

  componentWillMount: function() {
    this.getUser();
  },

  renderRoasters: function() {
    var roasters = this.state.roasters;

    if (roasters) {
      roasters = roasters.slice(0).map(function(roaster) {
        return <li>{roaster}</li>;
      });
    } 

    return roasters;
  },

  renderOfferings: function() {
    var offerings = this.state.offerings;

    if (offerings) {
      offerings = offerings.slice(0).map(function(offering) {
        return <li>{offering}</li>;
      });
    }

    return offerings;
  },

  render: function() {
    return (
        <div>
          <ul>{this.renderRoasters()}</ul>
          <ul>{this.renderOfferings()}</ul>
        </div>
    );
  }

});
