/** @jsx React.DOM */
var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    CoffeeForm   = require('./CoffeeForm.jsx');

module.exports = React.createClass({

  render: function() {

    return (
      <div>
        <CoffeeForm />
        <RouteHandler {...this.props} />
      </div>
    );
  }

});
