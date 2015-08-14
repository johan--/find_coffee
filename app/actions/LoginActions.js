var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    Constants = require('../constants/Constants.js');

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

  // Update user.
  updateUser: function(token) {
    AppDispatcher.handleViewAction({
      actionType: Constants.UPDATE_USER,
      token: token
    });
  },

  // Logout
  logoutUser: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.LOGOUT_USER
    });
  },

  // Flash Message
  updateFlashMessage: function(message) {
    AppDispatcher.handleViewAction({
      actionType: Constants.UPDATE_FLASH_MSG,
      msg: message
    });
  }
};
