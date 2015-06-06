/** @jsx React.DOM */
var React     = require('react'),
    NotFound  = require('./404.jsx');

module.exports = React.createClass({

  render: function() {
    var msg = 'Oh no! Looks like nothing matched that search criteria.';
    return <NotFound msg={msg} />;
  }

});
