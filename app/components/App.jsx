/** @jsx React.DOM */
var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    Header       = require('./Header.jsx'),
    AuthService  = require('../services/AuthService.js'),
    LoginStore   = require('../stores/LoginStore.js');

module.exports = React.createClass({

  getInitialState: function() {
    return this._update();
  },

  _update: function() {
    return {
      user: LoginStore.getUser(),
      err:  LoginStore.getError()
    };
  },

  componentDidMount: function() {
    this.changeListener = this._onChange,
    LoginStore.addChangeListener(this.changeListener);
  },

  _onChange: function() {
    this.setState(this._update());
  },

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this.changeListener);
  },

  render: function() {
    return (
        <div>
          <Header user={this.state.user} />
          <section id="mainContent">
            <RouteHandler {...this.props} err={this.state.err} user={this.state.user} />
          </section>
        </div>
    );
  }

});
