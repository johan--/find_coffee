/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link;

module.exports = React.createClass({

  renderText: function() {
    var offering = this.props.offering;

    if (this.props.hideRoaster) {
      return <span>{offering.name}</span>;
    } else {
      return <span>{offering.name} | {offering.roastery.name}</span>;
    }
  },

  handleClick: function(id) {
    this.props.handleClick({ offering_id: this.props.offering._id });
  },

  renderUnfollowButton: function() {
    var props = this.props;

    if (props.removeButton) {
      return (
        <button onClick={this.handleClick}
                className="unfollowBtn">
          X
        </button>
      );
    }
  },

  render: function() {
    return (
      <li className="offering">
        <Link to="offering" params={{_id: this.props.offering._id}}>
          {this.renderText()}
        </Link>
        {this.renderUnfollowButton()}
      </li>
    );
  }

});
