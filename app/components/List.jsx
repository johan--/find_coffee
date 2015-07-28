/** @jsx React.DOM */
var React = require('react'),
    ListItem = require('./RoasterListItem.jsx');

module.exports = React.createClass({

  handleMouseOver: function(roaster) {
    this.props.handleMouseOver(roaster);
  },

  renderList: function() {
    var list = [], self = this;

    this.props.roasters.forEach(function(roaster) {
      list.push(<ListItem handleMouseOver={self.handleMouseOver}
                          roaster={roaster} />);
    });

    return list;
  },

  render: function() {
    return (
      <ul>
        {this.renderList()}
      </ul>
    );
  }

});
