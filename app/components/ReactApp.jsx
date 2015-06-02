/** @jsx React.DOM */

var React    = require('react'),
    MyHeader = require('./myHeader.jsx');

module.exports = React.createClass({

  componentDidMount: function() {
    console.log('app mounted!');
  },

  render: function() {
    return (
        <div>
          <MyHeader user={{ name: 'Bill' }} loggedIn={false} />
        </div>
    );
  }

});
