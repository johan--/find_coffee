/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    AuthService = require('../services/AuthService.js');

module.exports = React.createClass({
  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      username: '',
      password: '',
      email:    ''
    };
  },

  handleChange: function(e) {
    var updatedState = {};
    updatedState[e.target.id] = e.target.value;
    this.setState(updatedState);
  },

  handleClick: function(e) {
    var state = this.state, self = this;
    e.preventDefault();

    AuthService.signup(state.username, state.password, state.email,
        function(validation) {
          if (validation && validation.failed) {
            self.setPasswordToBlank();
          } else {
            self.transitionTo('/profile');
            self.setFormToBlank();
          }
    });
  },

  setFormToBlank: function() {
    this.setState({ username: '', password: '', email: '' });
  },

  setPasswordToBlank: function() {
    this.setState({ password: '' });
  },

  render: function() {
    return (
      <div className="row">
        <div className="signup text-center col-xs-12">
          <h1>Sign Up</h1>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                value={this.state.username}
                id="username"
                placeholder="Username"
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={this.state.email}
                id="email"
                placeholder="Email"
                onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={this.state.password}
                id="password"
                placeholder="Password"
                onChange={this.handleChange} />
            </div>
            <button className="btn"
                    type="submit"
                    onClick={this.handleClick}>
                    Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
});
