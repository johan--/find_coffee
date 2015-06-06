/** @jsx React.DOM */
var React = require('react'),
    mongoose = require('mongoose');

module.exports = React.createClass({

  getInitialState: function() {
    return { offering: null };
  },

  componentDidMount: function() {
    var _id = this.props.params._id,
        self = this;

    // Handle server render.
    if (typeof window === 'undefined') {

      Offering = mongoose.model('Offering');
      var obj_id = "ObjectId(" + _id + ")";

      Offering.find({ _id: obj_id }, function(err, offering) {
        if (err) { throw err; }
        self.setState({ offering: offering });
      });

    // Handle client render.
    } else {
      this.setState({ offering: window.OFFERINGS[_id]});
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
