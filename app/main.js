/** @jsx React.DOM */

var React    = require('react'),
    ReactApp = require('./components/ReactApp.jsx');
    Header   = require('./components/myHeader.jsx');

React.render(<ReactApp />, document.getElementById('mount-point'));
