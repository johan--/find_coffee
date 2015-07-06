var AppDispatcher  = require('../dispatcher/AppDispatcher.js'),
    Constants      = require('../constants/Constants.js');

module.exports = {

  // Login user on server.
  loginUserServer: function(token) {
    AppDispatcher.handleServerAction({
      actionType: Constants.LOGIN_USER,
      token: token
    });
  },

  // Login user on client.
  loginUserClient: function(token) {
    AppDispatcher.handleViewAction({
      actionType: Constants.LOGIN_USER,
      token: token
    });
  },

  logoutUser: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.LOGOUT_USER
    });
  },

  handleLoginError: function(error) {
    AppDispatcher.handleViewAction({
      actionType: Constants.LOGIN_ERROR,
      error: error
    });
  }
};
