/** @jsx React.DOM */
var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  mixins: [Router.State, Router.Navigation],

  render: function() {
    return (
        <h1>Roasteries List</h1>
    );
  }

});
