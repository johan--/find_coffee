/** @jsx React.DOM */
var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    Header     = require('./Header.jsx');

module.exports = React.createClass({

  render: function() {
    return (
        <div>
          <Header user={this.props.user} />
          <section id="mainContent">
            <RouteHandler {...this.props} />
          </section>
        </div>
    );
  }

});
