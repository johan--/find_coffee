/** @jsx React.DOM */
var React       = require('react'),
    Button      = require('./Button.jsx'),
    Link        = require('react-router').Link,
    AuthService = require('../services/AuthService.js');

module.exports = React.createClass({

  logout: function(e) {
    e.preventDefault();
    AuthService.logout();
  },

  render: function() {
    var user = this.props.user;

    if (user) {
      var greeting = <li>{'Hello, ' + user.username}</li>,
          links  = <li><a href='' onClick={this.logout}>Logout</a></li>;
    } else {
      var greeting = <li>Welcome!</li>,
          links  = [<li><Link to="login">Login</Link></li>,
                    <li><Link to="signup">Sign Up</Link></li>];
    }

    return (
        <header>
          <ul>
            {greeting}
            {links}
          </ul>
        </header>
    );
  }

});
