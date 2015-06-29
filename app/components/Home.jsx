/** @jsx React.DOM */
var React        = require('react'),
    Link         = require('react-router').Link;

module.exports = React.createClass({

  render: function() {
    var msg = "Search the latest coffees from the country's best roasters.";

    return (
      <div>
        <h1 className="greeting">{msg}</h1>
        <Link className="searchAll" to="offerings">Search all Offerings</Link>
      </div>
    );
  }

});
