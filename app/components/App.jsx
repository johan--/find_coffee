/** @jsx React.DOM */
var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    MyHeader     = require('./myHeader.jsx');

module.exports = React.createClass({

  render: function() {
    return (
        <div>
          <MyHeader user={this.props.user} />
          <section id="mainContent">
            <RouteHandler {...this.props} />
          </section>
        </div>
    );
  }

});