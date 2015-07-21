/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      current: 0
    };
  },

  getPic: function() {
    var current = this.state.current,
        pics    = this.props.pics,
        pic     = pics[current];

    this.getNextPic();

    return <a href={pic.link}><img src={pic.images.low_resolution.url} /></a>;
  },

  // Cycle through photos endlessly.
  getNextPic: function() {
    var self = this;

    setTimeout(function() {
      var current = self.state.current,
          len     = self.props.pics.length;

      if (current === len - 1) {
        self.setState({ current: 0 });
      } else {
        self.setState({ current: ++current });
      }

    }, 3000);
  },

  render: function() {
    if (!this.props.pics) {
      return <div></div>;
    }

    return this.getPic();
  }

});
