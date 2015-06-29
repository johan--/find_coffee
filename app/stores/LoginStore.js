var AppDispatcher   = require('../dispatcher/AppDispatcher'),
    EventEmitter    = require('events').EventEmitter,
    Constants       = require('../constants/Constants.js'),
    jwt             = require('jsonwebtoken'),
    assign          = require('object-assign'),
    RouterContainer = require('../services/RouterContainer.js');

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
      LoginStore.setUser(jwt.decode(action.token));
      LoginStore.emitChange();
      break;

    case Constants.LOGOUT_USER:
      RouterContainer.get().transitionTo('/login');
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('jwt');
        Cookies.expire('jwt');
      }
      LoginStore.setUser(null);
      LoginStore.emitChange();
      break;

    default:
      break;
  };
});

module.exports = LoginStore;
