/** @jsx React.DOM */
var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler,
    MyHeader     = require('./myHeader.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      coffees: this.props.coffees
    };
  },

  render: function() {
    return (
        <div>
          <MyHeader user={this.props.user} />
          <section id="mainContent">
            <RouteHandler offerings={this.props.offerings} />
          </section>
        </div>
    );
  }

});
