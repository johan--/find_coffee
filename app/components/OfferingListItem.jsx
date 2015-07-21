/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link;

module.exports = React.createClass({

  getRoaster: function() {
    return this.props.offering.roastery.name;
  },

  getName: function() {
    return this.props.offering.name;
  },

  getId: function() {
    return this.props.offering._id;
  },

  renderText: function() {
    if (this.props.hideRoaster) {
      return <span>{this.getName()}</span>;
    } else {
      return <span>{this.getName()} | {this.getRoaster()}</span>;
    }
  },

  render: function() {
    return (
      <li className="offering">
        <Link to="offering" params={{_id: this.getId()}}>
          {this.renderText()}
        </Link>
      </li>
    );
  }

});
