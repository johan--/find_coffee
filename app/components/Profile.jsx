/** @jsx React.DOM */
var React    = require('react'),
    Router   = require('react-router'),
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
  _load: function() {
    var user = this.props.user,
        self = this;

    // Handle server load.
    if (typeof window === 'undefined') {
      var currentUser = new User(user);

      currentUser.getOfferings(function(err, offerings) {
        if (err) throw err;
        self.setState({ offerings: offerings });
      });

      currentUser.getRoasteries(function(err, roasters) {
        if (err) throw err;
        self.setState({ roasters: roasters });
      });

    // Handle client load.
    } else {
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
    }
  },

  componentDidMount: function() {
    this._load();
  },

  render: function() {
    var roasters  = this.state.roasters,
        offerings = this.state.offerings;

    if (roasters) {
      roasters = roasters.map(function(roaster) {
        return <li>{roaster}</li>;
      });
    }

    if (offerings) {
      offerings = offerings.map(function(offering) {
        return <li>{offering}</li>;
      });
    }

    return (
        <div>
          <ul>{roasters}</ul>
          <ul>{offerings}</ul>
        </div>
    );
  }
});
