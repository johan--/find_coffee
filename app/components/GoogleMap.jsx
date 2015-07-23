/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      map: null,
      marker: null,
      infoWindow: null
    };
  },

  componentDidMount: function() {
    this.createMap();
  },

  componentWillReceiveProps: function(nextProps) {
    var map = this.state.map,
        marker = this.state.marker,
        infoWindow = this.state.infoWindow,
        coords = nextProps.coords;

    var newPosition = new google.maps.LatLng(coords.lat, coords.lng);

    map.setCenter(newPosition);
    marker.setPosition(newPosition);

    this.setState({
      map: map,
      marker: marker,
      infoWindow: infoWindow
    });
  },

  createMap: function() {
    var coords = this.props.coords;
    var mapOptions = {
          minZoom: 9,
          zoom: 10,
          center: new google.maps.LatLng(coords.lat, coords.lng)
        };

    var map = new google.maps.Map(this.getDOMNode(), mapOptions),
        marker = this.renderMarker(map),
        infoWindow = this.renderInfoWindow(map, marker);

    this.setState({
      map: map,
      marker: marker,
      infoWindow: infoWindow
    });
  },

  renderMarker: function(map) {
    var coords = this.props.coords;

    return new google.maps.Marker({
      position: new google.maps.LatLng(coords.lat, coords.lng),
      map: map
    });
  },

  renderInfoWindow: function(map, marker) {
    return new google.maps.InfoWindow({
          map: map,
          anchor: marker,
          content: 'content'
        });
  },

  render: function() {
    return <div className="map_canvas"></div>;
  }

});
