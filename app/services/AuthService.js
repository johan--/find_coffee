var Constants    = require('../constants/Constants.js'),
    LoginActions = require('../actions/LoginActions'),
    request      = require('request');

function handleAuth(options) {
  request.post(options, function(err, res, body) {
    var parsedBody = JSON.parse(body);
    LoginActions.loginUserClient(parsedBody.token);
  });
}

module.exports = {

  // Login
  login: function(username, password) {

    var options = {
      url:  Constants.LOGIN_URL,
      form: { username: username, password: password }
    };

    handleAuth(options);
  },

  // Signup
  signup: function(username, password, email) {

    var options = {
      url:  Constants.SIGNUP_URL,
      form: { username: username, password: password, email: email }
    };

    handleAuth(options);
  },

  // Logout
  logout: function() {

    // Logout on client.
    LoginActions.logoutUser();

    // Logout on server.
    request.post({ url: Constants.LOGOUT_URL }, function(err, res, body) {
      if (err) console.error(err);
    });
  }

};
