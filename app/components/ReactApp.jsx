/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  componentDidMount: function() {
    console.log('mounted!');
  },

  render: function() {
    return (
        <div id="test">Test</div>
    );
  }

});
