/** @jsx React.DOM */
var React = require('react'),
    mongoose = require('mongoose');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      offering: {}
    };
  },

  getFlavors: function() {
    if (this.hasFlavors()) {
      return this.state.flavors.join(', ');
    }
  },

  getValue: function(value) {
    return value.constructor === Array ? value.join(',') : value;
  },

  componentDidMount: function() {
    var _id  = this.props.params._id, self = this;

    // Handle server load.
    if (typeof window === 'undefined') {
      var Offering = mongoose.model('Offering');

      Offering.find({ _id: _id }, function(err, offering) {
        if (err) throw err;
        self.setState({ offering: offering });
      });

    // Handle client load.
    } else {
      var offerings = this.props.offerings;

      // Find offering in offerings array.
      for (var i = 0, len = offerings.length; i < len; i++) {
        if (offerings[i]._id === _id) {
          this.setState({ offering: offerings[i] });
          break;
        }
      }
    }
  },

  isEmpty: function() {
    return Object.keys(this.state.offering).length === 0;
  },

  // False if empty array or null/undefined.
  hasValue: function(value) {
    return (value && value.constructor === Array && value.length) ||
           (value && value.constructor !== Array);
  },

  useCheckmark: function(value) {
    return value = value ? '\u2713' : null;
  }

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
      return <p><span className="background">Background:</span>{this.state.offering.background}</p>;
    }
  },

  renderFlavors: function() {
    if (this.hasFlavors()) {
      return <p><span className="flavors">Flavors:</span>{this.getFlavors()}</p>;
    }
  },

  renderValue: function(value) {
    return <span> className="value">
             {this.getValue(value)}
           </span>;
  },

  renderCategory: function(category) {
    return <span className="category">{category}:</span>;
  },

  // Build list of all categories and values that exist within offering.
  renderList: function(categories) {
    var offering = this.state.offering, listItems = [];

    categories.forEach(function(cat) {
      var val = offering[cat];
      
      if (typeof val === 'boolean') {
        val = this.useCheckmark(val);
      }

      if (this.hasValue(val)) {
        listItems.push(<li>{this.renderCategory(cat)} {this.renderValue(val)}</li>);
      }
    });

    return <ul>{listItems}</ul>;
  },

  render: function() {
    if (this.isEmpty()) {
      return <div className="overview"><h1>Loading...</h1></div>;
    } else {
      return (
        <div className="overview">
          <h1><a href={this.state.offering.url}>{this.state.offering.name}</a></h1>
          {this.renderBackground()}
          {this.renderFlavors()}
          {this.renderInfo()}
          {this.renderBooleans()}
        </div>
      );
    }
  }

});
