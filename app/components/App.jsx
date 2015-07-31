/** @jsx React.DOM */
var React = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    Header = require('./Header.jsx'),
    AuthService = require('../services/AuthService.js'),
    LoginStore = require('../stores/LoginStore.js');

module.exports = React.createClass({

  getInitialState: function() {
    return this.getStore();
  },

  getStore: function() {
    return {
      user: LoginStore.getUser(),
      err:  LoginStore.getError()
    };
  },

  componentDidMount: function() {
    this.changeListener = this.onChange,
    LoginStore.addChangeListener(this.changeListener);
  },

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this.changeListener);
  },

  onChange: function() {
    this.setState(this.getStore());
  },

  render: function() {
    return (
        <div>
          <Header user={this.state.user} />
          <section className="container">
            <RouteHandler {...this.props}
                          err={this.state.err}
                          user={this.state.user} />
          </section>
        </div>
    );
  }

});
