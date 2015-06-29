/** @jsx React.DOM */
var React  = require('react'),
    Router = require('react-router'),
    RouterContainer = require('./services/RouterContainer.js'),
    LoginActions = require('./actions/LoginActions.js');

// Get props from server rendered HTML.
var data = JSON.parse(document.getElementById('props').innerHTML).data;

// Create router.
var router = Router.create({
  routes:   require('./reactRoutes.jsx'),
  location: Router.HistoryLocation
});

// Store router for use in transitions.
RouterContainer.set(router);

// Check for JWT token.
var token = localStorage.getItem('jwt');
if (token) {
  LoginActions.loginUserClient(token);
}

router.run(function(Handler, state) {
  var params = state.params;
  React.render(<Handler params={params} data={data}/>,
      document.getElementById('mount-point'));
});
