/** @jsx React.DOM */
var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler;

module.exports = React.createClass({

  renderList: function() {
    var list = [],
        baseUrl = 'https://localhost:8000/roasters/';

    this.props.data.roasters.forEach(function(roaster) {
      list.push(<li><a href={baseUrl + roaster._id}>{roaster.name}</a></li>);
    });

    return <ul className="roasterList">{list}</ul>;
  },

  render: function() {
    return (
      <div className="roasteries">
        <h1>Roasters</h1>
        {this.renderList()}
      </div>
    );
  }

});
