/** @jsx React.DOM */
var React        = require('react'),
    CoffeeForm   = require('./CoffeeForm.jsx');

module.exports = React.createClass({

  render: function() {
    var user = this.props.user,
        msg;

    msg = user && user.admin ?  'Welcome admin!' : 'Not authorized';

    return (
      <div>
        <h1>{msg}</h1>
      </div>
    );
  }

});
