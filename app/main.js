/** @jsx React.DOM */
var React  = require('react'),
    Router = require('react-router'),
    RouterContainer = require('./services/RouterContainer.js'),
    LoginActions = require('./actions/LoginActions.js');

// Get props from server rendered HTML.
var props     = JSON.parse(document.getElementById('props').innerHTML),
    offerings = props.offerings,
    roasters  = props.roasters;

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
  React.render(<Handler params={params} roasters={roasters} offerings={offerings}/>,
      document.getElementById('mount-point'));
});
