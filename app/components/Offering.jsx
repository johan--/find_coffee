/** @jsx React.DOM */
var React    = require('react'),
    mongoose = require('mongoose'),
    Link = require('react-router').Link;

module.exports = React.createClass({

  getInitialState: function() {
    return {
      offering: {}
    };
  },

  getFlavors: function() {
    if (this.hasFlavors()) {
      return this.state.offering.flavors.join(', ');
    }
  },

  getValue: function(value) {
    return value.constructor === Array ? value.join(', ') : value;
  },

  setOfferingOnServer: function(_id) {
    var Offering = mongoose.model('Offering'), self = this;

    Offering.findOne({ _id: _id }, function(err, offering) {
      if (err) throw err;
      self.setState({ offering: offering });
    });
  },

  setOfferingOnClient: function(_id) {
    var offerings = this.props.offerings;

    for (var i = 0, len = offerings.length; i < len; i++) {
      if (offerings[i]._id === _id) {
        this.setState({ offering: offerings[i] });
        break;
      }
    }
  },

  componentDidMount: function() {
    var _id = this.props.params._id;

    if (typeof window === 'undefined') {
      this.setOfferingOnServer.call(this, _id);
    } else {
      this.setOfferingOnClient.call(this, _id);
    }
  },

  isEmpty: function() {
    return Object.keys(this.state.offering).length === 0;
  },

  // False if empty array or null/undefined.
  hasValue: function(value) {
    return value && ((value.constructor === Array && value.length) ||
                     (value.constructor !== Array));
  },

  useCheckmark: function(value) {
    return value = value ? '\u2713' : null;
  },

  hasBackground: function() {
    return !!this.state.offering.background;
  },

  hasFlavors: function() {
    var flavors = this.state.offering.flavors;
    return flavors && flavors.length;
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
          <span className="background category">Background:</span>
          <span className="value">{this.state.offering.background}</span>
        </p>
      );
    }
  },

  renderFlavors: function() {
    if (this.hasFlavors()) {
      return (
        <p>
          <span className="flavors category">Flavors:</span>
          <span className="value">{this.getFlavors()}</span>
        </p>
      );
    }
  },

  renderValue: function(value) {
    return <span className="value">{this.getValue(value)}</span>;
  },

  renderCategory: function(category) {
    return <span className="category">{category}:</span>;
  },

  // Build list of all categories and values that exist within offering.
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

  getRoasteryLink: function() {
    var roastery = this.state.offering.roastery;

    return (
      <Link to="roaster" params={{ _id: roastery._id }}>
        {roastery.name}
      </Link>
    );
  },

  renderTitle: function() {
    var offering = this.state.offering;

    return (
      <h1><a href={offering.url}>{offering.name}</a> - {this.getRoasteryLink()}</h1>
    );
  },

  renderPrice: function() {
    var price = this.state.offering.price;

    if (price) {
      return <p className="price">$ {price}</p>;
    }
  },

  render: function() {
    if (this.isEmpty()) {
      return <div className="offerings"><h1>Loading...</h1></div>;
    } else {
      return (
        <div className="overview">
          {this.renderTitle()}
          {this.renderPrice()}
          {this.renderFlavors()}
          {this.renderBackground()}
          {this.renderInfo()}
          {this.renderBooleans()}
        </div>
      );
    }
  }

});
