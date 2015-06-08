/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link;

module.exports = React.createClass({

  render: function() {
    var offering = this.props.offering,
        _id      = offering._id,
        name     = offering.name,
        roaster  = offering.roastery.name;

    return (
      <li className="offering">
        <Link to="offering" params={{_id: _id}}>
          <span>{name} | {roaster}</span>
        </Link>
      </li>
    );
  }
});
