/** @jsx React.DOM */

var React  = require('react'),
    Button = require('./Button.jsx');

module.exports = React.createClass({

  render: function() {
    var text, name;

    if (this.props.loggedIn) {
      name = 'logoutBtn';
      text = 'Logout';
    } else {
      name = 'loginBtn';
      text = 'Login';
    }

    return (
        <header>
          <ul>
            <li>Hello, {this.props.user.name}.</li>
            <li><Button name={name} text={text} /></li>
          </ul>
        </header>
    );
  }

});
