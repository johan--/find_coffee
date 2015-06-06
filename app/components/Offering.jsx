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
      this.setState({ offering: this.props.offerings[_id] });
    }
  },

  render: function() {
    if (this.state.offering) {
      var offering = this.state.offering;
      return (
        <div>
          <h3>{offering.name}</h3>
          <p>{offering.description}</p>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
});
