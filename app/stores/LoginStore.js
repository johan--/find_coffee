var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    Constants     = require('../constants/Constants.js'),
    assign        = require('object-assign'),
    jwt_decode    = require('jwt-decode');

var CHANGE_EVENT = 'change',
    _user        = null,
    _token       = null;

var LoginStore = assign({}, EventEmitter.prototype, {

  getUser: function() {
    return _user;
  },

  setUser: function(user) {
    _user = user;
  },

  getToken: function() {
    return _token;
  },

  setToken: function(token) {
    _token = token;
  },

  isLoggedIn: function() {
    return !!_user;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
});

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case Constants.LOGIN_USER:
      localStorage.setItem('jwt', action.token);
      LoginStore.setToken(action.token);
      LoginStore.setUser(jwt_decode(action.token));
      LoginStore.emitChange();
      break;

    case Constants.LOGOUT_USER:
      localStorage.removeItem('jwt');
      LoginStore.setToken(null);
      LoginStore.setUser(null);
      LoginStore.emitChange();
      break;

    default:
      break;
  };
});

module.exports = LoginStore;
