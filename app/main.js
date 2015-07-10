/** @jsx React.DOM */
var React        = require('react'),
    Router       = require('react-router'),
    reactRoutes  = require('./reactRoutes.jsx'),
    LoginActions = require('./actions/LoginActions.js');

// Get props from server rendered HTML.
var data = JSON.parse(document.getElementById('props').innerHTML).data;

// Create router.
var router = Router.create({
  routes:   reactRoutes,
  location: Router.HistoryLocation
});

// Check for JWT token.
var token = localStorage.getItem('jwt');
if (token) {
  LoginActions.loginUserClient(token);
}

router.run(function(Root, state) {
  var params = state.params;
  React.render(<Root params={params} data={data}/>,
      document.getElementById('mount-point'));
});
