/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    GoogleMap = require('./GoogleMap.jsx'),
    List = require('./List.jsx'),
    RouteHandler = Router.RouteHandler;

module.exports = React.createClass({

  getInitialState: function() {
    var coords = this.getRoasterCoords();

    return {
      current: coords.random,
      coords: coords.all
    };
  },

  getRoasterCoords: function() {
    var coords = {};

    this.props.data.roasters.forEach(function(roaster) {
      coords[roaster._id] = roaster.location;
    });

    return {
      all: coords,
      random: this.getRandomCoords(coords)
    };
  },

  getRandomCoords: function(coords) {
    var _ids = Object.keys(coords),
        randomIndex = Math.floor(Math.random() * _ids.length);

    return _ids[randomIndex];
  },

  handleMouseOver: function(_id) {
    this.setState({ current: _id });
  },

  render: function() {
    return (
      <div className="roasteries col-xs-12 col-md-10 col-md-offset-2">
        <div className="list col-xs-12 col-md-3">
          <h1>Roasters</h1>
          <List handleMouseOver={this.handleMouseOver}
                roasters={this.props.data.roasters} />
        </div>
        <div classname="col-xs-12 col-md-9">
          <GoogleMap coords={ this.state.coords[this.state.current] } />
        </div>
      </div>
    );
  }

});
