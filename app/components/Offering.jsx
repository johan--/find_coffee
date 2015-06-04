/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  render: function() {
    var offering = this.props.offering,
        url      = offering.url,
        name     = offering.name,
        roaster  = offering.roastery.name;

    return <li><a href={url}><span>{name} | {roaster}</span></a></li>;
  }
});
