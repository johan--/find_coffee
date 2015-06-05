/** @jsx React.DOM */
var React    = require('react'),
    Offering = require('./Offering.jsx');

module.exports = React.createClass({

  render: function() {
    var offerings = this.props.offerings.map(function(offering) {
      return <Offering offering={offering} key={offering._id} />;
    });

    return (
      <ul>
        {offerings}
      </ul>
    );
  }
});
