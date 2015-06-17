var AppDispatcher  = require('../dispatcher/AppDispatcher.js'),
    Constants      = require('../constants/Constants.js');

module.exports = {

  // Login user
  loginUser: function(token) {
    AppDispatcher.dispatch({
      actionType: Constants.LOGIN_USER,
      token: token
    });
  },

  // Logout user
  logoutUser: function() {
    AppDispatcher.dispatch({
      actionType: Constants.LOGOUT_USER
    });
  }
};
