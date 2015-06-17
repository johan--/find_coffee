/** @jsx React.DOM */
var React = require('react'),
    AuthService = require('../services/AuthService.js');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      username: '',
      password: '',
    };
  },

  handleChange: function(e) {
    var state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  },

  login: function(e) {
    e.preventDefault();
    AuthService.login(this.state.username, this.state.password);
  },

  render: function() {
    return (
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit} >
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={this.state.password}
              id="password"
              placeholder="Password"
              onChange={this.handleChange} />
          </div>
          <button type="submit" onClick={this.login}>Login</button>
        </form>
      </div>
    );
  }
});
