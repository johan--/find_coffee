/** @jsx React.DOM */

var React    = require('react'),
    ReactApp = require('./components/ReactApp.jsx');

React.render(<ReactApp user="Nathan" homePage={true}/>,
    document.getElementById('mount-point'));
