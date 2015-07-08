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
    };
  },

  handleChange: function(e) {
    var state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  },

  login: function(e) {
    var self = this;
    e.preventDefault();
    this.setState({password: ''});
    AuthService.login(this.state.username, this.state.password, function() {
      self.transitionTo('/profile');
    });
  },

  render: function() {
    var err = this.props.err,
        errorMsg = err ? <p>{err}</p> : null;

    return (
      <div>
        {errorMsg}
        <h1>Login</h1>
        <form className="login">
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
