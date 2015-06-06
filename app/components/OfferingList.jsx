/** @jsx React.DOM */
var React = require('react'),
    OfferingListItem = require('./OfferingListItem.jsx');

module.exports = React.createClass({

  render: function() {
    var self = this;
    var offerings = this.props.offerings.map(function(offering) {
      return <OfferingListItem
               params={self.props.params}
               offering={offering} 
               key={offering._id}
             />;
    });

    return (
      <ul>
        {offerings}
      </ul>
    );
  }
});
