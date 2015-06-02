/** @jsx React.DOM */

var React    = require('react'),
    ReactApp = require('./components/ReactApp.jsx');

React.render(new ReactApp({}), document.getElementById('mount-point'));
