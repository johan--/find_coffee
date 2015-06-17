var AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter  = require('events').EventEmitter,
    Constants     = require('../constants/Constants.js'),
    assign        = require('object-assign'),
    jwt_decode    = require('jwt-decode');
