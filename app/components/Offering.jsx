/** @jsx React.DOM */
var React = require('react'),
    mongoose = require('mongoose'),
    LoginActions = require('../actions/LoginActions.js'),
    Constants = require('../constants/Constants.js'),
    getDecodedText = require('../../lib/utils.js').getDecodedText,
    request = require('request'),
    Link = require('react-router').Link;

var attempts = 0; // Used to retry requests.

module.exports = React.createClass({

  getInitialState: function() {
    return {
      offering: {}
    };
  },

  getValue: function(value) {
    return value.constructor === Array ? value.join(', ') : value;
  },

  getRoasteryLink: function() {
    var roastery = this.state.offering.roastery;

    return (
      <Link to="roaster" params={{ _id: roastery._id }}>
        {roastery.name}
      </Link>
    );
  },

  setOffering: function(_id) {
    var offerings = this.props.offerings;

    for (var i = 0, len = offerings.length; i < len; i++) {
      if (offerings[i]._id.toString() === _id) {
        return this.setState({ offering: offerings[i] });
      }
    }

    return this.setState({ offering: 'NOT_FOUND' });
  },

  componentDidMount: function() {
    this.setOffering(this.props.params._id);
  },

  handleClick: function() {
    var user = this.props.user,
        baseUrl = Constants.WATCH_OFFERING_URL,
        user_id = 'user=' + this.props.user._id,
        offering_id = 'offering=' + this.props.params._id,
        self = this;

    var url = baseUrl + user_id + '&' + offering_id;

    request(url, function(err, res, body) {
      if (err) {
        if (attempts < 5) {
          ++attempts;
          self.handleClick();
        }
      }

      if (res.statusCode === 404) {
        // TODO: User wasn't found.
      }

      if (res.statusCode === 200) {
        var token = JSON.parse(body).token;
        LoginActions.updateUser(token);
      }
    });
  },

  isEmpty: function() {
    return Object.keys(this.state.offering).length === 0;
  },

  hasValue: function(value) { // False if empty array or null/undefined.
    return value && ((value.constructor === Array && value.length) ||
                     (value.constructor !== Array));
  },

  useCheckmark: function(value) {
    return value = value ? '\u2713' : null;
  },

  hasBackground: function() {
    return !!this.state.offering.background;
  },

  wasntFound: function() {
    return this.state.offering === 'NOT_FOUND';
  },

  hasFlavors: function() {
    var flavors = this.state.offering.flavors;
    return flavors && flavors.length;
  },

  isLoggedIn: function() {
    return !!this.props.user;
  },

  isFollowingOffering: function() {
    var offering_id = this.props.params._id,
        offerings = this.props.user.offerings;

    for (var i = 0, len = offerings.length; i < len; i++) {
      if (offering_id === offerings[i]) {
        return true;
      }
    }

    return false;
  },

  renderInfo: function() {
    var categories = ["origin", "region", "producer", "farm", "process",
                      "sourced", "varietals", "method", "harvest" ];
    return this.renderList(categories);
  },

  renderBooleans: function() {
    var categories = ["blend", "decaf", "organic", "directTrade", "fairTrade"];
    return this.renderList(categories);
  },

  renderBackground: function() {
    if (this.hasBackground()) {
      return (
        <p>
          <span className="background-info category">Background:</span>
          <span className="value">
            {getDecodedText(this.state.offering.background)}
          </span>
        </p>
      );
    }
  },

  renderFlavors: function() {
    if (this.hasFlavors()) {
      var flavors = this.state.offering.flavors.join(', ');

      return (
        <p>
          <span className="flavors category">Flavors:</span>
          <span className="value">
            {getDecodedText(flavors)}
          </span>
        </p>
      );
    }
  },

  renderValue: function(value) {
    return (
      <span className="value">
        {getDecodedText(this.getValue(value))}
      </span>
    );
  },

  renderCategory: function(category) {
    return (
      <span className="category">
        {getDecodedText(category)}:
      </span>
    );
  },

  renderList: function(categories) {
    var offering = this.state.offering,
        listItems = [],
        self = this;

    categories.forEach(function(cat) {
      var val = offering[cat];
      
      if (typeof val === 'boolean') {
        val = self.useCheckmark(val);
      }

      if (self.hasValue(val)) {
        listItems.push(<li>{self.renderCategory(cat)} {self.renderValue(val)}</li>);
      }
    });

    return <ul>{listItems}</ul>;
  },

  renderFollowButton: function() {
    if (this.isLoggedIn() && !this.isFollowingOffering()) {
      return (
        <button name="followButton"
                className="btn"
                type="button"
                onClick={this.handleClick}>
                Remember this offering
        </button>
      );
    }
  },

  renderTitle: function() {
    var offering = this.state.offering;

    return (
      <h1>
        <a href={offering.url}>{offering.name}</a>
        - {this.getRoasteryLink()}
        {this.renderPrice()}
      </h1>
    );
  },

  renderPrice: function() {
    var price = this.state.offering.price;

    if (price) {
      return <span className="price">{"$" + price}</span>;
    }
  },

  renderNotFound: function() {
    return (
      <div className="col-xs-12 col-sm-7">
        <h1>No offering was found.</h1>
      </div>
    );
  },

  renderLoading: function() {
    return <div className="col-xs-12 col-sm-7"><h1>Loading...</h1></div>;
  },

  renderFound: function() {
    return (
      <div className="col-xs-12 col-sm-7 background overview">
        {this.renderTitle()}
        {this.renderFollowButton()}
        {this.renderFlavors()}
        {this.renderBackground()}
        {this.renderInfo()}
        {this.renderBooleans()}
      </div>
    );
  },

  render: function() {

    // Handle loading.
    if (this.isEmpty()) {
      return this.renderLoading();

    // Handle found or not found.
    } else {
      if (this.wasntFound()) {
        return this.renderNotFound();
      } else {
        return this.renderFound();
      }
    }
  }

});
