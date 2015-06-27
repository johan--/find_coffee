/** @jsx React.DOM */
var React = require('react'),
    mongoose = require('mongoose');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      offering: {}
    };
  },

  componentDidMount: function() {
    var _id  = this.props.params._id,
        self = this;

    // Handle server render.
    if (typeof window === 'undefined') {
      var Offering = mongoose.model('Offering');

      // Pull offering from Mongo.
      Offering.find({ _id: _id }, function(err, offering) {
        if (err) { throw err; }
        self.setState({ offering: offering });
      });

    // Handle client render.
    } else {
      var offerings = this.props.offerings,
          len = offerings.length,
          i = 0;

      // Find offering in offering array using param _id.
      for (i; i < len; i++) {
        if (offerings[i]._id === _id) {
          this.setState({ offering: offerings[i] });
          break;
        }
      }
    }
  },

  // Return list of given offering information.
  _getInfo: function() {
    if (this._offeringIsEmpty()) { return null; }
    var categories = ["origin", "region", "producer", "farm", "process",
                      "sourced", "varietals", "method", "harvest" ];
    return this._buildList(categories);
  },

  // Return list of offering's boolean values. (blend, decaf, etc.)
  _getBooleans: function() {
    if (this._offeringIsEmpty()) { return null; }
    var categories = ["blend", "decaf", "organic", "directTrade", "fairTrade"];
    return this._buildList(categories);
  },

  // Build a list from the given categories.
  _buildList: function(categories) {
    var offering  = this.state.offering,
        listItems = [];

    // Add categories to list if they contain a value.
    categories.forEach(function(cat) {
      var val = offering[cat];
      
      if (typeof val === 'boolean') {
        val = val ? '\u2713' : null; // True = checkmark
      }

      // Ignore blank values or empty arrays.
      if ((val && val.constructor === Array && val.length) ||
          (val && val.constructor !== Array)) {


        var category = <span className="category">{cat}:</span>,
            value    = <span className="value">
                          {val.constructor === Array ? val.join(', ') : val}
                       </span>;

        listItems.push(<li>{category} {value}</li>);
      }
    });
    return <ul>{listItems}</ul>;
  },

  // Helper that returns true if offering is blank.
  _offeringIsEmpty: function() {
    return Object.keys(this.state.offering).length === 0;
  },

  render: function() {
    var offering   = this.state.offering,
        flavors    = offering.flavors,
        background = offering.background;

    if (background) {
      background = <p><span className="background">Background:</span>{background}</p>;
    }

    if (flavors && flavors.length) {
      flavors = <p><span className="flavors">Flavors:</span>{flavors.join(', ')}</p>;
    }

    if (this._offeringIsEmpty()) {
      return <div className="overview"><h1>Loading...</h1></div>;
    } else {
      return (
        <div className="overview">
          <h1>{offering.name}</h1>
          {background}
          {flavors}
          {this._getInfo()}
          {this._getBooleans()}
        </div>
      );
    }
  }
});
