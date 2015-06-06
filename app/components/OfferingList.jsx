/** @jsx React.DOM */
var React = require('react'),
    OfferingListItem = require('./OfferingListItem.jsx');

module.exports = React.createClass({

  render: function() {
    var offerings    = this.props.offerings,
        allOfferings = [],
        self         = this;

    for (offering in offerings) {
      allOfferings.push(
        <OfferingListItem
          params={self.props.params}
          offering={offerings[offering]}
          key={offering}
        />
      );
    }

    return (
      <ul>
        {allOfferings}
      </ul>
    );
  }
});
