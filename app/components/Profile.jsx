/** @jsx React.DOM */
var React      = require('react'),
    Router     = require('react-router'),
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

  // Load a user's roasters and offerings.
  getUser: function() {
    var user = this.props.user, self = this;

    $.ajax({
      url: "https://localhost:8000/load",
      type: "POST",
      contentType: 'application/json',
      data: JSON.stringify({ _id: self.props.user._id }),

      success: function(data, textStatus, jqXHR) {
        var parsed = JSON.parse(data);

        self.setState({
          roasters: parsed.roasteries,
          offerings: parsed.offerings
        });
      }.bind(self),

      error: function(jqXHR, textStatus, err) {
        if (err) throw err;
      }
    });
  },

  componentDidMount: function() {
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
