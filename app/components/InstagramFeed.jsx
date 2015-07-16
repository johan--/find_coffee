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
        pics    = this.props.pics;

    this.getNextPic();

    return <img src={pics[current].images.low_resolution.url} />;
  },

  // Cycle through photos endlessly.
  getNextPic: function() {
    var self = this;

    setTimeout(function() {
      var current = self.state.current,
          len     = self.props.pics.length;

      if (current === len) {
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
