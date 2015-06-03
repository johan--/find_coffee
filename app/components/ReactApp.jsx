/** @jsx React.DOM */

var React      = require('react'),
    MyHeader   = require('./myHeader.jsx'),
    Content    = require('./Content.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      coffees: this.props.coffees
    };
  },

  render: function() {
    return (
        <div>
          <MyHeader user={{ name: 'Bill' }} loggedIn={true} />
          <Content greeting={true} />
        </div>
    );
  }

});
