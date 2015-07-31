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
    var updatedState = {};
    updatedState[e.target.id] = e.target.value;
    this.setState(updatedState);
  },

  // Login
  handleClick: function(e) {
    var self = this;
    e.preventDefault();
    AuthService.login(this.state.username, this.state.password, function() {
      self.transitionTo('/profile');
    });
    this.setFormToBlank();
  },

  setFormToBlank: function() {
    this.setState({ username: '', password: '' });
  },

  hasError: function() {
    return !!this.props.err;
  },

  renderError: function() {
    return this.hasError() ? <p>{this.props.err}</p> : null;
  },

  render: function() {
    return (
      <div className="row">
        <div className="login text-center col-xs-12">
          {this.renderError()}
          <h1>Login</h1>
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
                    Login
            </button>
          </form>
        </div>
      </div>
    );
  }
});
