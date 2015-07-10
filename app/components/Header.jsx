/** @jsx React.DOM */
var React       = require('react'),
    Router      = require('react-router'),
    Link        = require('react-router').Link,
    AuthService = require('../services/AuthService.js');

module.exports = React.createClass({
  mixins: [Router.State, Router.Navigation],

  // Logout
  handleClick: function(e) {
    var path = this.getPath(), self = this;
    e.preventDefault();
    AuthService.logout(path, function() {
      self.transitionTo('/login');
    });
  },

  isUser: function() {
    return !!this.props.user;
  },

  getGreeting: function() {
    if (this.isUser()) {
      return 'Hello, ' + this.props.user.username;
    } else {
      return 'Welcome!';
    }
  },

  renderGreeting: function() {
    return <li>{this.getGreeting()}</li>;
  },

  renderLinks: function() {
    if (this.isUser()) {
      return <li><a href='' onClick={this.handleClick}>Logout</a></li>;
    } else {
      return [
        <li><Link to="login">Login</Link></li>,
        <li><Link to="signup">Sign Up</Link></li>
      ];
    }
  },

  render: function() {
    return (
      <header>
        <ul>
          {this.renderGreeting()}
          {this.renderLinks()}
        </ul>
      </header>
    );
  }

});
