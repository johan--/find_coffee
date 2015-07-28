var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    Constants = require('../constants/Constants.js'),
    jwt = require('jsonwebtoken'),
    assign = require('object-assign');

var CHANGE_EVENT = 'change',
    _user        = null,
    _error       = null;

var LoginStore = assign({}, EventEmitter.prototype, {

  getUser: function() {
    return _user;
  },

  setUser: function(user) {
    _user = user;
  },

  getError: function() {
    return _error;
  },

  setError: function(err) {
    _error = err;
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

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case Constants.LOGIN_USER:
      // This action is only called on the server if a jwt cookie exists.
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('jwt', action.token);
        Cookies.set('jwt', action.token);
      } 
      LoginStore.setError(null);
      LoginStore.setUser(jwt.decode(action.token));
      LoginStore.emitChange();
      break;

    case Constants.LOGOUT_USER:
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('jwt');
        Cookies.expire('jwt');
      }
      LoginStore.setError(null);
      LoginStore.setUser(null);
      LoginStore.emitChange();
      break;

    case Constants.UPDATE_USER:
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('jwt', action.token);
        Cookies.set('jwt', action.token);
      }
      LoginStore.setError(null);
      LoginStore.setUser(jwt.decode(action.token));
      LoginStore.emitChange();
      break;

    case Constants.LOGIN_ERROR:
      LoginStore.setError(action.error);
      LoginStore.emitChange();
      break;

    default:
      break;
  };
});

module.exports = LoginStore;
