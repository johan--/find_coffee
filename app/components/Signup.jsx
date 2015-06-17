/** @jsx React.DOM */
var React = require('react'),
    AuthService = require('../services/AuthService.js');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      username: '',
      password: '',
      email:    ''
    };
  },

  handleChange: function(e) {
    var state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  },

  signup: function(e) {
    e.preventDefault();
    AuthService.signup(this.state.username, this.state.password, this.state.email);
  },

  render: function() {
    return (
      <div className="signup">
        <h1>Sign Up</h1>
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
          <button type="submit" onClick={this.signup}>Sign Up</button>
        </form>
      </div>
    );
  }
});