var Constants = require('../constants/Constants.js'),
    LoginActions = require('../actions/LoginActions'),
    request = require('request');

function handleAuth(options, cb) {
  request.post(options, function(err, res, body) {
    if (res.statusCode >= 400) {
      LoginActions.handleLoginError(body);
    } else {
      var parsedBody = JSON.parse(body);
      LoginActions.loginUserClient(parsedBody.token);
      cb();
    }
  });
}

module.exports = {

  // Login
  login: function(username, password, cb) {
    var options = {
      url:  Constants.LOGIN_URL,
      form: { username: username, password: password }
    };

    handleAuth(options, cb);
  },

  // Signup
  signup: function(username, password, email, cb) {
    var options = {
      url:  Constants.SIGNUP_URL,
      form: { username: username, password: password, email: email }
    };

    handleAuth(options, cb);
  },

  // Logout
  logout: function(path, cb) {
    // Logout on client.
    LoginActions.logoutUser();
    if (typeof window !== 'undefined' && path === '/profile') {
      cb(); // Causes redirect.
    }

    // Logout on server.
    request.post({ url: Constants.LOGOUT_URL }, function(err, res, body) {
      if (err) console.error(err);
      if (path === '/profile') {
        res.redirect('https://localhost:8000/login');
      }
    });
  }

};
