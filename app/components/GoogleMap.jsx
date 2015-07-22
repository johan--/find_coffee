/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  getDefaultProps: function() {
    return {
      coords: {
        lat: 53.5333,
        lng: -113.4073126
      }
    };
  },

  componentDidMount: function() {
    this.createMap();
  },

  createMap: function() {
    var coords = this.props.coords;
    var mapOptions = {
          minZoom: 9,
          zoom: 10,
          center: new google.maps.LatLng(coords.lat, coords.lng)
        };

    var map = new google.maps.Map(this.getDOMNode(), mapOptions),
        marker = this.renderMarker(map);

    this.renderInfoWindow(map, marker);
  },

  renderMarker: function(map) {
    var coords = this.props.coords;

    return new google.maps.Marker({
      position: new google.maps.LatLng(coords.lat, coords.lng),
      map: map
    });
  },

  renderInfoWindow: function(map, marker) {
    new google.maps.InfoWindow({
          map: map,
          anchor: marker,
          content: 'content'
        });
  },

  render: function() {
    return <div className="map_canvas"></div>;
  }

});
