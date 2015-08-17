var Constants = require('../constants/Constants.js'),
    LoginActions = require('../actions/LoginActions'),
    validateInputs = require('../../lib/utils.js'),
    request = require('request');

function handleAuth(options, cb) {
  var validation = validateInputs(options.form);

  // Client side validation.
  if (validation.failed) {
    LoginActions.updateFlashMessage({
      msg: validation.errors[0].msg,
      type: 'warning'
    });
    return cb(validation);
  }

  request.post(options, function(err, res, body) {
    if (res.statusCode >= 400) {
      LoginActions.updateFlashMessage({ msg: body, type: 'warning' });
    } else {
      var parsedBody = JSON.parse(body);
      LoginActions.loginUserClient(parsedBody.token);
      cb(null);
    }
  });
}

module.exports = {

  // Login
  login: function(username, password, cb) {
    var options = {
      url:  Constants.NEW_SESSION_URL,
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
    });
  }

};
