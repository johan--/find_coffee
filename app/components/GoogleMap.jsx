/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      map: null,
      listeners: [],
      markers: {},
      infoWindow: null
    };
  },

  // Get marker object for given coords.
  getMarker: function(coords) {
    return this.state.markers[this.createMarkerName(coords)];
  },

  // Open infoWindow for current marker.
  setInfoWindow: function(content, map, marker) {
    var infoWindow = this.state.infoWindow;

    if (infoWindow) {
      infoWindow.close();
    }

    infoWindow = new google.maps.InfoWindow({content: content});
    infoWindow.open(map, marker);
    this.setState({ infoWindow: infoWindow });
  },

  componentDidMount: function() {
    this.createMap();
  },

  componentWillReceiveProps: function(nextProps) {
    var map = this.state.map,
        coords = nextProps.coords,
        marker = this.getMarker(coords);

    // Change map location.
    map.setCenter(new google.maps.LatLng(coords.lat, coords.lng));

    // Open infoWindow for currently selected roaster.
    this.setInfoWindow(coords.name, map, marker);

    this.setState({ map: map });
  },

  componentWillUnmount: function() {
    this.state.listeners.forEach(function(listener) {
      google.maps.event.removeListener(listener);
    });
  },

  createMap: function() {
    var coords = this.props.coords,
        marker = this.getMarker(coords),
        allCoords = this.props.all,
        self = this;

    var mapOptions = {
          minZoom: 4,
          zoom: 14,
          center: new google.maps.LatLng(coords.lat, coords.lng)
        };

    var map = new google.maps.Map(this.getDOMNode(), mapOptions);

    // Create all markers.
    Object.keys(allCoords).forEach(function(key) {
      self.createMarker(allCoords[key].name, map, allCoords[key]);
    });

    // Open infoWindow on current marker.
    this.setInfoWindow(coords.name, map, marker);

    this.setState({ map: map });
  },

  createMarkerName: function(coords) {
    return "" + coords.lat + coords.lng;
  },

  // Create marker on map that opens infoWindow on click event.
  createMarker: function(name, map, coords) {
    var listeners = this.state.listeners,
        markers = this.state.markers,
        self = this;

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(coords.lat, coords.lng),
      map: map
    });

    var listener = google.maps.event.addListener(marker, "click", function() {
      self.setInfoWindow(name, map, marker);
    });

    // Store reference to listener for later removal.
    listeners.push(listener);

    // Store reference to marker.
    markers[this.createMarkerName(coords)] = marker;

    this.setState({
      listeners: listeners,
      markers: markers
    });
  },

  render: function() {
    return <div className="map_canvas"></div>;
  }

});
