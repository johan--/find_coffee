/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler;

module.exports = React.createClass({

  render: function() {
    return (
      <div className="row">
        <RouteHandler perPage={10} {...this.props} />
      </div>
    );
  }

});
