/** @jsx React.DOM */
var React = require('react'),
    mongoose = require('mongoose');

module.exports = React.createClass({

  getInitialState: function() {
    return { offering: null };
  },

  componentDidMount: function() {
    var _id  = this.props.params._id,
        self = this;

    // If offerings/:id is rendered server side,
    // need to pull offering object from Mongo.
    if (typeof window === 'undefined') {
      var Offering = mongoose.model('Offering');

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

  render: function() {
    if (this.state.offering) {
      var offering = this.state.offering;
      return (
        <div>
          <h3>{offering.name}</h3>
          <p>{offering.background}</p>
          <p>{offering.flavors}</p>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
});
