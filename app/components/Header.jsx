/** @jsx React.DOM */
var React  = require('react'),
    Button = require('./Button.jsx');

module.exports = React.createClass({

  render: function() {
    var loggedInUser = this.props.user;

    if (loggedInUser) {
      var greeting = <li>{'Hello, ' + loggedInUser}</li>,
          buttons  = <li><Button name="logout" text="Logout" /></li>;
    } else {
      var greeting = <li>Welcome!</li>,
          buttons  = [<li><Button name="login" text="Login" /></li>,
                      <li><Button name="signup" text="Sign Up" /></li>];
    }

    return (
        <header>
          <ul>
            {greeting}
            {buttons}
          </ul>
        </header>
    );
  }

});
