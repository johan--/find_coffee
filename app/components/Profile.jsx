/** @jsx React.DOM */
var React      = require('react'),
    Router     = require('react-router'),
    Link       = Router.Link,
    request    = require('request'),
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

  componentDidMount: function() {
    this.getUser();
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
